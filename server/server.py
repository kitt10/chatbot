from tornado.web import Application, RequestHandler, StaticFileHandler
from tornado.ioloop import IOLoop
from tornado.escape import json_decode
from os.path import join, dirname
from json import dumps
from time import time

from bot import T5


class EP_Web(RequestHandler):

    def get(self):
        self.render('../deploy/index.html')

    def check_origin(self, origin):
        return True

    def set_default_headers(self, *args, **kwargs):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

class EP_Log(RequestHandler):
    
    def initialize(self, webserver):
        self.webserver = webserver

    def get(self):
        self.write(dumps({'online': True}))
        
    def check_origin(self, origin):
        return True
        
    def options(self):
        self.set_status(204)
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.set_header("Access-Control-Request-Headers", "Content-Type")
                
class EP_Query(RequestHandler):

    def initialize(self, webserver, worker):
        self.webserver = webserver
        self.worker = worker

    def post(self):
        query = json_decode(self.request.body)
        self.webserver.log(f'New message: {query}')
        self.write(dumps(self.worker.react(q=query['message'])))
        
    def check_origin(self, origin):
        return True
        
    def options(self):
        self.set_status(204)
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.set_header("Access-Control-Request-Headers", "Content-Type")

           
class WebServer:
    
    def __init__(self, worker, port, rel_static_path, verbose):
        self.worker = worker
        self.port = port
        self.rel_static_path = rel_static_path
        self.static_path = join(dirname(__file__), self.rel_static_path)
        self.verbose = verbose
        
        urls = [('/', EP_Web),
                ('/log/', EP_Log, {'webserver': self}),
                ('/query/', EP_Query, {'webserver': self, 'worker': self.worker}),
                ('/(.*)', StaticFileHandler, {'path': self.static_path})]

        settings = {
                'debug': True, 
                'autoreload': True}

        app = Application(urls, **settings)
        app.listen(self.port)

        self.log('Starting server, port: '+str(self.port))
        IOLoop.current().start()

    def log(self, buf):
        if self.verbose:
            print('SERVER LOG:', buf)
                 
class Worker:
    
    def __init__(self, base_static_path, t5_config, verbose=True):
        self.base_static_path = base_static_path
        self.config = t5_config
        self.verbose = verbose

        self.t5 = T5(self.config)
        self.log('T5 initialized.')
        
    def react(self, q):
        t0 = time()
        ans = self.t5.predict(q)
        dt = time()-t0
        res = {'text': ans, 'dt': round(dt, 4)}
        self.log(f'message: {q}')
        self.log(f'reply: {res}')
        return res
        
    def log(self, buf):
        if self.verbose:
            print('WORKER LOG:', buf)
    

if __name__ == '__main__':

    SERVER_PORT = 6841
    RELATIVE_STATIC_PATH = '../deploy'
    BASE_PATH = '/home/kitt/projects/chatbot/server'
    TOKENIZER = 'sentencepiece.model'           # English
    #TOKENIZER = 'T5_32k_CCcs.model'            # Czech
    
    ## -- T5 config
    t5_config = {
        'tokenizer': join(BASE_PATH, 'tokenizer', TOKENIZER),
        't5_model': {
            'pre_trained': join(BASE_PATH, 'model')
        },
        'choose_from_n': 3
    }
    
    worker = Worker(base_static_path=RELATIVE_STATIC_PATH, t5_config=t5_config)

    # Init and Run WebServer
    WebServer(worker=worker,
              port=SERVER_PORT, 
              rel_static_path=RELATIVE_STATIC_PATH, 
              verbose=True)
