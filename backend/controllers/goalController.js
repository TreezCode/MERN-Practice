const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    // User data from 'protect' middleware
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    await validateUser(goal, user, req, res)
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    await validateUser(goal, user, req, res)
    await goal.remove()
    res.status(200).json({
        id: req.params.id
    })
})

// Check for user and make sure logged in user matches goal user
const validateUser = asyncHandler(async (goal, user, req, res) => {
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}