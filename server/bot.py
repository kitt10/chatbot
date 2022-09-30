from transformers import T5Tokenizer, TFT5ForConditionalGeneration
import tensorflow as tf
    
    
class T5(object):
    
    def __init__(self, config):
        self.config = config
        self.tokenizer = None
        self.load_tokenizer()
        self.model = None
        self.load_model()
        
    def load_tokenizer(self):
        self.tokenizer = T5Tokenizer(self.config["tokenizer"])
        print(f'Tokenizer from {self.config["tokenizer"]} loaded.')

    def load_model(self):
        self.model = TFT5ForConditionalGeneration.from_pretrained(self.config["t5_model"]["pre_trained"])
        print(f'Model from {self.config["t5_model"]["pre_trained"]} loaded.')

    def predict(self, sentence):
        sentences = self.tokenizer([sentence])
        input_ids = tf.constant(sentences["input_ids"])
        outputs = self.model.generate(input_ids)

        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
