from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json


from tensorflow import keras
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
model = keras.models.load_model('txt_gen/static/models/text_generation_model_2025-04-29.h5')

with open('txt_gen/static/models/tokenizer.json', 'r', encoding='utf-8') as f:
    tokenizer_data =json.load(f)
tokenizer = tokenizer_from_json(tokenizer_data)


def generate_text(seed_text, next_words, max_sequence_len, temperature=1.0):
    generated_text = seed_text
    for _ in range(next_words):

        token_list = tokenizer.texts_to_sequences([seed_text])[0]
        token_list = pad_sequences([token_list], maxlen=max_sequence_len-1, padding='pre')

        predicted_probs = model.predict(token_list, verbose=0)[0]

        predicted_probs = np.asarray(predicted_probs).astype('float64')
        predicted_probs = np.log(predicted_probs + 1e-7) / temperature
        predicted_probs = np.exp(predicted_probs) / np.sum(np.sum(np.exp(predicted_probs)))

        predicted_index = np.random.choice(len(predicted_probs), p=predicted_probs)

        output_word = ""
        for word, index in tokenizer.word_index.items():
            if index == predicted_index:
                output_word = word
                break

        if output_word:
            seed_text += " " + output_word
            generated_text += " " + output_word

    return generated_text.strip()

def home(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        seed = data.get('seed', '')

        print(model.summary())

        next_words = 20

        generated_text = generate_text(seed, next_words, max_sequence_len=20, temperature=0.7)

        response_data = {
            'Generated Text': f'{generated_text}'
        }
        return JsonResponse(response_data)

    return render(request, 'index.html')
