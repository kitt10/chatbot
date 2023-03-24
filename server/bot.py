from transformers import T5Tokenizer, T5ForConditionalGeneration
from transformers import pipeline
from random import choice
    
    
class T5(object):
    
    def __init__(self, config):
        self.config = config
        self.tokenizer = None
        self.load_tokenizer()
        self.model = None
        self.load_model()

        self.emotion_model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=False)
        
    def load_tokenizer(self):
        self.tokenizer = T5Tokenizer(self.config["tokenizer"])
        print(f'Tokenizer from {self.config["tokenizer"]} loaded.')

    def load_model(self):
        self.model = T5ForConditionalGeneration.from_pretrained(self.config["t5_model"]["pre_trained"], from_tf=True)
        print(f'Model from {self.config["t5_model"]["pre_trained"]} loaded.')

    def predict(self, sentence):
        input_ids = self.tokenizer([sentence], return_tensors="pt").input_ids
        outputs = self.model.generate(input_ids, 
                                        max_length=30,
                                        num_beams=5,
                                        no_repeat_ngram_size=2, 
                                        num_return_sequences=self.config['choose_from_n'], 
                                        early_stopping=True)

        decoded = self.tokenizer.batch_decode(outputs, skip_special_tokens=True)
        print(f'Choosing from: {decoded}')
        ans = choice(decoded)

        emotion_prompt = self.emotion_model(sentence)[0]
        emotion_ans = self.emotion_model(ans)[0]
        print('Emotion: ', emotion_ans, emotion_prompt)

        return f'<{emotion_prompt["label"]}:{str(round(emotion_prompt["score"], 2))}> => <{emotion_ans["label"]}:{str(round(emotion_ans["score"], 2))}> {ans}'
