const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type:Date,
            default: () => new Date()
        },
        exercises: [
            {
                type: {
                        type:String,
                        trim: true,
                        required: "Enter an exercise type"
                    },
                    name: {
                        type: String,
                        trim: true,
                        required: "Enetr an exercise name"
                    },
                    duration: {
                        type: Number,
                        required: "Enter an exercise duration in minutes"
                    },
                    weight: {
                        type: Number
                    },
                    reps: {
                        type: Number
                    },
                    distance: {
                        type: Number
                    }
                }
            ]              
        },
        {
            toJSON: {
                virtuals: true
            }
        }
);

// Adding a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
    // Calculating sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;