const express = require('express');
const Hotels = require('../models/Hotels');
const HotelsRouter = express.Router();


HotelsRouter.get('/', async (req, res) => {
    const hotels = await Hotels.find({});
    res.json(hotels);
});


HotelsRouter.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotels.find({ _id: req.params.id });
        res.json(hotel)
    }
    catch {
        res.status(404).json({ message: "not found" })
    }
});


HotelsRouter.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const foundRecord = await Hotels.findById(id);

        if (!foundRecord) {
            return res.status(404).json({ error: 'Запись не найдена' });
        }

        Object.keys(updates).forEach(key => {
            foundRecord[key] = updates[key];
        });

        await foundRecord.save();
        res.json({ message: 'Запис успішно оновлена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка' });
    }
})


HotelsRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Hotels.deleteOne({ _id: id });
        res.json({ message: 'Запис успішно видалений' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка' });
    }
})


HotelsRouter.post('/add', async (req, res) => {
    try {
        const { name, Country, image_url, description, stars_count } = req.body;

        const newHotel = new Hotels({
            name,
            Country,
            image_url,
            description,
            stars_count,
        });

        await newHotel.save();

        res.status(201).json({ message: 'Запис успішно добавлено' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка' });
    }
});


module.exports = HotelsRouter;
