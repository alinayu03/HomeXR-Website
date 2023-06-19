const Home = require('../models/homeModel')
const mongoose = require('mongoose')

// get all homes
const getHomes = async (req, res) => {
    const user_id = req.user._id

    const homes = await Home.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(homes)
}

// get a single home
const getHome = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such home'})
    }

    const home = await Home.findById(id)

    if (!home) {
        return res.status(404).json({error: 'No such home'})
    }

    res.status(200).json(home)
}

// create new home

const createHome = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const home = await Home.create({ title, load, reps, user_id })
        res.status(200).json(home)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a home 
const deleteHome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such home' })
    }

    const home = await Home.findOneAndDelete({_id: id})

    if (!home) {
        return res.status(404).json({ error: 'No such home' })
    }

    res.status(200).json(home)

}

// update a home
const updateHome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such home' })
    }

    const home = await Home.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!home) {
        return res.status(404).json({ error: 'No such home' })
    }

    res.status(200).json(home)
}


module.exports = {
    getHomes,
    getHome,
    createHome,
    deleteHome,
    updateHome
}