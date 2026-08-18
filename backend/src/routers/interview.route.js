const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { generateInterviewReport } = require('../services/ai.service');

const interviewRouter = express.Router()

interviewRouter.post('/' , authMiddleware , async (req,res)=>{
    try {
        const {resume , selfDescription , jobDescription} = req.body

        if(!resume || !selfDescription || !jobDescription){
            return res.status(400).json({
                message:"Please provide all the required fields"
            })
        }

        const interviewReport = await generateInterviewReport({resume , selfDescription , jobDescription})

        return res.status(200).json({
            message:"Interview report generated successfully",
            interviewReport
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
})


module.exports = interviewRouter