const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Настроим CORS
app.use(cors({
  origin: 'http://localhost:5173', // Разрешаем только запросы с этого домена
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешаем только определённые HTTP методы
  allowedHeaders: ['Content-Type'], // Разрешаем только Content-Type в заголовках
}));

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/travelplanner', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const tripSchema = new mongoose.Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    places: [String]
});

const Trip = mongoose.model('Trip', tripSchema);

// Маршрут для получения всех маршрутов
app.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        console.error('Ошибка при получении маршрутов:', error);
        res.status(500).send('Ошибка сервера');
    }
});

// Маршрут для добавления нового маршрута
app.post('/trips', async (req, res) => {
    const { title, startDate, endDate, places } = req.body;
  
    // Убедись, что даты приходят в формате YYYY-MM-DD (чтобы их не путать)
    const trip = new Trip({
      title,
      startDate: new Date(startDate), // конвертируем, если приходит как строка
      endDate: new Date(endDate),
      places
    });
  
    try {
      const saved = await trip.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка при сохранении маршрута' });
    }
  });

// Маршрут для удаления маршрута
app.delete('/trips/:id', async (req, res) => {
    try {
      await Trip.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Trip deleted' });
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // Маршрут для обновления маршрута
app.put('/trips/:id', async (req, res) => {
    try {
      const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(trip);
    } catch (err) {
      res.status(500).send(err);
    }
});

// Прослушивание порта 3005
app.listen(3005, () => {
  console.log('Server is running on port 3005');
});
