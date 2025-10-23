import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title : {
        type: String,
        default : "My Resume"
    },
    public : {
        type: Boolean,
        default : false
    },
    professional_summary : {
        type: String,
        default : ""
    },
    skills: [String],
    personal_info: {
        full_name: {type : String , default : "" },
        email: {type : String , default : "" },
        phone: {type : String , default : "" },
        location: {type : String , default : "" },
        linkedIn: {type : String , default : "" },
        website: {type : String , default : "" },
        profession: {type : String , default : "" },
        image: {type : String , default : "" },
    },
    education: [
        {
            institution: {type : String  },
            degree: {type : String  },
            field: {type : String  },
            graduation_date: {type : String  },
            gpa: {type : String  } 
        }
    ],
    experience: [
        {
            company: {type : String  },
            position: {type : String  },
            start_date: {type : String  },
            end_date: {type : String  },
            description: {type : String },
            is_current: {type : Boolean , default : false },

        }
    ],
    
    projects: [
        {
            name: {type : String  },
            type : {type : String  },
            description: {type : String  },
        }
    ],
}, { timestamps: true , minimize : false});

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;