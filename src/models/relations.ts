import { Assistant } from "./Assistant";
import { Emotion } from "./Emotion";
import { Exercises } from "./Exercises";
import { Module } from "./Module";
import { Option } from "./Option";
import { Path } from "./Path";
import { Question } from "./Question";
import { QuizCategory } from "./QuizCategory";
import { Reward } from "./Reward";
import { User } from "./User";


//Reacion de muchos a muchos
User.belongsToMany(Reward,{
    through: 'user_reward',
    foreignKey: 'user_id',
    otherKey: 'reward_id'
})

Reward.belongsToMany(User,{
    through: 'user_reward',
    foreignKey: 'reward_id',
    otherKey: 'user_id'
})
//--------------------------

Path.hasMany(Module,{foreignKey: 'path_id',as: 'Modules'})
Module.belongsTo(Path,{foreignKey: 'path_id'});

Question.hasMany(Option, { foreignKey: 'question_id' , as: 'Options' });
Option.belongsTo(Question, { foreignKey: 'question_id' });

Assistant.hasMany(User,{foreignKey:'assistant_id',as:'Users'});
User.belongsTo(Assistant,{foreignKey:'assistant_id',as:'Assistant'});

Emotion.hasMany(Exercises,{foreignKey: 'emotion_id',})
Exercises.belongsTo(Emotion,{foreignKey: 'emotion_id'});