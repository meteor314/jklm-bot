
import json
import pyperclip

# ask user to chose a dictionary :
print('Choose a dictionary :')
print('1. English')
print('2. French')
print('3. Spanish')
dictionary = input('Enter a number : ')
if dictionary == '1':
    with open('./dict/dictionary_en.json', 'r') as f:
        dictionary = json.load(f)
elif dictionary == '2':
    with open('./dict/dictionary_fr.json', 'r') as f:
        dictionary = json.load(f)
elif dictionary == '3':
    with open('./dict/dictionary_es.json', 'r') as f:
        dictionary = json.load(f)
else:
    print('Wrong number')
    exit()

# read the dictionary file

all_used = []

# get all words with '-' and add them to all_used
for word in dictionary:
    if '-' in word:
        all_used.append(word)

# sort the words by length in descending order, and remove words with '-'
words = [word for word in dictionary if '-' not in word]
words.sort(key=lambda x: -len(x))

def find_words(letters):
    for word in words:
        if letters in word and word not in all_used:
            all_used.append(word)
            return word
    return 'No word found'

while True:
    answer = input('Enter a word (or "q" to quit): ')
    if answer == 'q':
        break
    new_word = find_words(answer)
    print(f"The word is {new_word}")
    pyperclip.copy(new_word)

