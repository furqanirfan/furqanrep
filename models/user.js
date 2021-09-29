'use strict';
// import {Model} from 'sequelize';

// const {
//   Model
// } = require('sequelize');
const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
      type: DataTypes.TEXT,
      defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
  });
  
export const Users = (sequelize, DataTypes) => {
//   class Student extends Model {
    // static associate(models) {
    //   Student.belongsTo(models.Classroom, {
    //     foreignKey: 'classroom_id',
    //     as: 'classroom'
    //   });
//       Student.belongsToMany(models.Course, {
//         through: 'StudentCourse',
//         as: 'courses',
//         foreignKey: 'student_id'
//       });
//     }
//   };
  user.init({
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.TEXT,
    user_email: DataTypes.TEXT,
    user_password: DataTypes.TEXT,
    access_token: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};