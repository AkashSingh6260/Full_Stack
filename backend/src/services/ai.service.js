const { GoogleGenAI } = require("@google/genai");
const {z} = require('zod')
const {zodToJsonSchema} = require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


//1. first defing the schem for which we have to generate the reponse 
const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe('this is the question that will be asked in the interview'),
            intention: z.string().describe('this is the intetion behidn the question'),
            answer: z.string().describe('this is the answer to the question'),
        })
    ),
    behaviourQuestions: z.array(
        z.object({
            question: z.string().describe('this is the question that will be asked in the interview'),
            intention: z.string().describe('this is the intetion behidn the question'),
            answer: z.string().describe('this is the answer to the question'),
        })
    ),
    skillGaps: z.array(
        z.object({
            skill: z.string().describe('this is the skill that is missing in the resume'),
            severity: z.enum(['low' , 'medium', 'high']).describe('this is the severity of the skill gap'),
        })
    ),
    preparationPlan: z.array(
        z.object({
            day: z.number().describe('this is the day on which the preparation will be done'),
            focus: z.string().describe('this is the area of focus on the given day'),
            tasks: z.array(z.string().describe('this is the task to be done on the given day')),
        })
    ),
});



async function generateInterviewReport({
    resume,
    selfDescription ,
    jobDescription
}){

    const prompt = `
    You are an expert technical interviewer.
                        
                        Generate a structured JSON report for a job candidate based on the following:
                        1. Resume
                        2. Self-description
                        3. Job description

                        The JSON must follow this structure:
                        ${JSON.stringify(zodToJsonSchema(interviewReportSchema), null, 2)}

                        Resume:
                        ${resume}

                        Self-Description:
                        ${selfDescription}

                        Job Description :
                        ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
                
    });

    return JSON.parse(response.text)
}
    


module.exports = generateInterviewReport