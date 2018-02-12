
# Ts-sequelize-models
This package is made to help you initialize sequelize models very easily not only that but , also it will help you make a very neat and good looking sequelize models using typescript.

**prerequisite**
- Before installing you will need to install of course sequelize using 
`npm i sequelize`
- you will also need to install sequelize type declarations using this command
`npm i @types/sequelize`

**Installation**

- Now to install this package just type

    `npm i ts-sequelize-models`

**How to use this package to make amazing typescript sequelize models**

- first you need to make a class and extend the base class sequelizeModel like that.

```import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes } from 'sequelize';

export class User extends sequelizeModel {

    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
        };
    }

}
```
The above code does exactly what this sequelize code does
``` 
sequelize.define('User', {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
        }
    });
```
- The class name will be your name of the model if you wanted different you can always override the `modelName` property.
- when you class extend the sequelizeModel it will ask you to implement the `getAttribute()` function which will be the attributes that will be used to create your table.

**This was the basic usage but , how to make associations with that model**

- you just need to override the associate() method and inside it define your associations like that.
```
	associate(models: any, currentModel: Model<any, any>): any {
		models.Role.hasMany(currentModel, { constraints: false, allowNull: true, defaultValue: null });
		// you can do as many associations as you want here
    }
```
- now after that your have finished the associations

**Now How to add sequelize Hooks** 

- just as easy as overriding a function and return a callback from it like that
```
beforeCreate() {
        return hashPassword(user.password).then(hashedPw => {
            user.password = hashedPw;
        });
 }
```
The above function will exactly do when you do that code using the normal sequelize models
```
User.beforeCreate((user: any, options: any) => {
return hashPassword(user.password).then(hashedPw => {
            user.password = hashedPw;
        });
 });
```
- now it looks much more neater

**Hint :** you now don't need to go to the sequelize docs to know what hook functions are available. All hooks are just available when you press your auto complete keys cause this the beauty of typescript.

**Now How to pass the options parameter in the sequelize.define** 

you just need to override the getOptions() method like that and don't forget to make it's return type so typescript would autocomplete to you the attributes you can enter

```
getOptions(): DefineOptions<any>{
  return {
  // your options here
  };
}
```

More Detailed documentation is coming in  a few days which will show all the functions that can be overriden and a full models examples to more illustrate the package.

## Now How to Initialize all those models you have made 

- First just initalize your sequelize object using your config like that
 ```
 const Sequelize = require('sequelize');
 let sequelize = new Sequelize(config.database, config.username,  config.password, config);
 ```
- I required sequelize like that not with import cause sequelize only export the sequelize interface in it so it will work with you this way.
- In future versions I will make a function event to initialize the sequelize for you but , for now I give you the flexibility of creating it yourself.

 -  Now all is missing is this line of code to initialize all your models 
 ```
 import { sequelizeInit } from 'ts-sequelize-models';
 
 let { sequelize, models } = await sequelizeInit(sequelize, './api/models/',
            {
                exposeGlobal: true
            });
 ```
 - first paramter is your sequelize object you just created
 - second parameter is the path to your **compiled** models
 - third parameter is some options for sync I by default automatically sync for you with force:false
 - this function above will return you two objects 

|                |Type                          |Description                         
|----------------|-------------------------------|-----------------------------|
|models|   Object | object that contains the models after they have been defined and ready for use object key is the modelName
sequelize |instance of sequelize | This is the sequlize object you passed to me I just used it and return it back to you in case you need it by anyway or another  

 
 **This is a detailed table to show you the options object in sequelizeInit() **
 
| Option                |Type                          |Description                         
|----------------|-------------------------------|-----------------------------|
|exposeGlobal|   Boolean | expose the model names to be accessible globaly like that `User.find()` directly without any imports. 
sync | Boolean | it's an option if you want to sync or not if true the package sync with option force:false
sync | Object | now if you passed an object this will be the same exact options you pass to the normal sequelize sync function which is documented here http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-method-sync if you forgot to pass force:false I will automatically add force:false by default while syncing
