const { MongoClient } = require('mongodb');
const { User } = require('../../modal/userModal/userModal');
const { getDatabase } = require('../../utility');

// Count occurrences of words in sentences
function countWordOccurrences(sentences, words) {
  const wordCounts = {};

  for (const word of words) {
    wordCounts[word] = 0;

    for (const sentence of sentences) {
      const wordsInSentence = sentence.split(' ');
      const count = wordsInSentence.filter(w => w.toLowerCase() === word.toLowerCase()).length;
      wordCounts[word] += count;
    }
  }

  return wordCounts;
}

exports.wordCount = (req, res) => {
  // Sample sentences
  const sentences = [
    'A dog is lazy',
    'A man is old',
    'A dog is old',
    'A man is lazy and old',
    'A woman is smart',
    'A boy is running'
  ];
  const targetWords = ['A', 'dog'];
  const wordCounts = countWordOccurrences(sentences, targetWords);

  res.json({ wordCounts });

}


exports.clearCollection = async (req, res) => {
  const collectionName = 'user';

  try {
    const db = getDatabase();
    const collection = db.collection(collectionName);
    const deleteResult = await collection.deleteMany({});
    res.json({ deletedCount: deleteResult.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
}

exports.addSentenceAsDoc = async (req, res) => {
  const collectionName = 'user';
  const sentence = req.body.sentence;

  if (!sentence) {
    return res.status(400).json({ error: 'The "sentence" field is required in the request body.' });
  }

  try {

    const db = getDatabase();
    const collection = db.collection(collectionName);
    const insertResult = await collection.insertOne({ sentence });
    res.json({ insertedId: insertResult.insertedId });

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
}

exports.getUserInfo = async(req, res) => {
  const user =await User.find();
  res.status(200).json(user)
}

exports.addUserData = async (req, res) => {
  const { email, name, company, phone } = req.body
  try {

    if (!req.body) {
      return res.status(400).send({ message: "Bad request", success: false });
    }
    else {
      const userObj = new User({
        full_name: name,
        email: email,
        phone: phone,
        company_name: company
      })
      User.create(userObj).then((result) => {
        return res.json(result)
      }).catch((error) => {
        res.status(500).json({ message: "Bad request", success: false })
      })

    }

  }
  catch (error) {
    res.status(500).send(error)
  }
}