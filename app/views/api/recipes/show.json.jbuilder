json.extract! @recipe, :id, :name, :user_id, :meal, :dish, :cuisine, :time_required, :servings, :ingredients, :directions

json.ingredients @recipe.ingredients.each do |ingredient|
    json.extract! ingredient, :name, :amount, :metric
end

json.author @recipe.user.name


# {
#     "2": {
#         "id": 2,
#         "name": "Chocolate Avocado Protein Balls",
#         "userId": 0,
#         "meal": "Snack",
#         "dish": "Protein Balls",
#         "cuisine": "Healthy",
#         "timeRequired": "20 minutes",
#         "servings": "12",
#         "ingredients": [
#             {
#                 "name": "avocado",
#                 "amount": "1",
#                 "metric": "ripe"
#             },
#             {
#                 "name": "oats",
#                 "amount": "1",
#                 "metric": "cup"
#             },
#             {
#                 "name": "protein_powder",
#                 "amount": "1/2",
#                 "metric": "cup"
#             },
#             {
#                 "name": "cocoa_powder",
#                 "amount": "1/4",
#                 "metric": "cup"
#             },
#             {
#                 "name": "honey",
#                 "amount": "1/4",
#                 "metric": "cup"
#             },
#             {
#                 "name": "almond_butter",
#                 "amount": "1/4",
#                 "metric": "cup"
#             },
#             {
#                 "name": "dark_chocolate_chips",
#                 "amount": "1/2",
#                 "metric": "cup"
#             },
#             {
#                 "name": "vanilla_extract",
#                 "amount": "1",
#                 "metric": "teaspoon"
#             },
#             {
#                 "name": "coconut_flakes",
#                 "amount": "1/4",
#                 "metric": "cup"
#             },
#             {
#                 "name": "chia_seeds",
#                 "amount": "1",
#                 "metric": "tablespoon"
#             }
#         ],
#         "directions": [
#             "In a food processor, combine ripe avocado, oats, protein powder, cocoa powder, honey, almond butter, dark chocolate chips, vanilla extract, coconut flakes, and chia seeds.",
#             "Pulse until the mixture is smooth and well combined.",
#             "Transfer the mixture to a bowl and refrigerate for 15 minutes to make it easier to handle.",
#             "Using your hands, roll the mixture into bite-sized balls.",
#             "Store the protein balls in an airtight container in the refrigerator.",
#             "Enjoy these Chocolate Avocado Protein Balls as a healthy snack!"
#         ],
#         "author": "Kylie Johnson"
#     }
# }