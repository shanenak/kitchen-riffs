<h1 align="center">Kitchen Riffs</h1>

<div align="center">

</div>

<p align="center">Live link to <a href='https://kitchen-riffs.onrender.com/'>Kitchen Riffs</a></p>

<p align="center"> This recipe website combines features from Bon Appetit and Epicurious. Find recipes to use up the ingredients in your fridge. If there are no exact matches, inspiration will be provided to riff on. Happy cooking!
    <br> 
</p>

## 📝 Table of Contents

- [Why Riffs?](#idea)
- [Functionalities](#functionalities)
- [Highlights](#highlights)
- [Future Scope](#future_scope)
- [Technology Stack](#tech_stack)
- [Acknowledgments](#acknowledgments)

## 🍴 Why Kitchen Riffs? <a name = "idea"></a>

In the United States, food waste is estimated to be between 30-40 percent of the food supply. This is important to note because nearly 35 million people across America suffer from food insecurity.

This recipe website aims to help use up ingredients that are left in the fridge before they go bad. The search bar takes in individual ingredients and filters recipes that include those ingredients. If we don't have an exact match, inspiration will be pulled up that you can riff on. Say good bye to your leftover bunch of cilantro!

## ✅ Functionalities <a name = "functionalities"></a>

- Search for multiple ingredients at a time
- Filter recipes based on cuisines, meals, and dishes
- If no recipes match the filters, inspiration for recipes will be displayed using an external API (Tasty)
  ![recipe-index](https://kitchen-riffs-seeds.s3.us-west-1.amazonaws.com/IndexExample.png "Recipe Index")

- View recipe ingredients, directions, and ratings
  ![recipe-details](https://kitchen-riffs-seeds.s3.us-west-1.amazonaws.com/RecipeExample.png "Recipe Example")
- Review recipes with a 5 star rating and a comment
- Delete reviews
  ![recipe-reviews](https://kitchen-riffs-seeds.s3.us-west-1.amazonaws.com/ReviewExample.png "Review Example")
- Save recipes with notes and tags
- Update and delete saved recipes

## 💡 Highlights <a name = "highlights"></a>

My original plan for this project comprised mainly of CRUD features (Create, Read, Update, Destroy). Fortunately, I got to practice additional skills and challenge myself in new ways. Two examples are using Python for data manipulation and using an external API to get recipes that aren't in the database yet.

### Python data manipulation

When faced with data that requires cleaning, my first instinct is always to turn to Python. I used the Pandas library to clean and manipulate data sourced from ChatGPT to seed all of my recipes, users, ingredients, and ratings.

```
ingredients = recipes.explode('ingredients')

split = pd.DataFrame(ingredients['ingredients'].to_list(), columns = ['name', 'amount', 'metric'])

ingredients = pd.concat([ingredients, split], axis=1)[['recipe_id', 'name', 'amount', 'metric']]
```

The code above is a short snippet from my Jupyter notebook where I parsed ingredients to populate a table that could be easily filtered and displayed. Ruby certainly has its strengths, but it was nice to return to Python for a quick task.

### Recipe API

I aimed to create a recipe website that prioritizes Zero Waste and allows user to use up what's in their fridge. I find it frustrating when recipes requires a small amount of an obscure ingredient that will later go to waste.

To address this issue, I used an API that fetched recipes related to a list of ingredients or keywords. The code snippet below demonstrates how I passed ingredients into the request.

```
const params = new URLSearchParams();
    params.set("size", 3);
    params.set("q", ingredients.join(', '));
    const urlWithParams = url + '?' + params.toString();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
```

## 🚀 Future Scope <a name = "future_scope"></a>

The external API did not have a consistent URL field, so only the name and description of possible recipes are provided. In the future, I hope to build out that feature more to identify and display real recipes that match the filters.

## ⛏️ Built With <a name = "tech_stack"></a>

- [Ruby on Rails](hhttps://rubyonrails.org/) - Backend
- [PostgreSQL](https://www.postgresql.org/) - Database
- [React Redux](https://react-redux.js.org/) - Frontend

## 🎉 Acknowledgments <a name = "acknowledgments"></a>

- [Bon Appetit](https://www.bonappetit.com/) - Styling & photos
- [Epicurious](http://epicurious.com/) - Functionality inspiration
- [Tasty API](https://rapidapi.com/apidojo/api/tasty/) - Recipe inspiration
