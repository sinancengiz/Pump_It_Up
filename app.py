# import necessary libraries
import os
import pandas as pd
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#from flask_sqlalchemy import SQLAlchemy
# status group cvs file grouped
status_group = pd.read_csv('Resources/status_group.csv')
# cleaned data csv file
cleaned_data = pd.read_csv('Resources/cleaned_train_data.csv')
map_df = cleaned_data[["longitude","latitude","status_group","population","gps_height"]]
map_df = map_df.sample(n = 5000)
map_data = []

for i in range(len(map_df)) : 
   my_dict = {
       "longitude" : float(map_df.iloc[i, 0]),
       "latitude" : float(map_df.iloc[i, 1]),
       "status" : float(map_df.iloc[i, 2]),
        "population" : float(map_df.iloc[i, 3]),
       "gps_height" : float(map_df.iloc[i, 4])
   } 
   map_data.append(my_dict)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html" )

@app.route("/business")
def business():
    return render_template("business.html" )

@app.route("/getting_data")
def getting_data():
    return render_template("getting_data.html" )

@app.route("/cleaning")
def cleaning():
    return render_template("cleaning.html" )

@app.route("/enrich")
def enrich():
    return render_template("enrich.html" )

@app.route("/find_insight")
def find_insight():
    return render_template("find_insight.html" )

@app.route("/ml")
def ml():
    return render_template("ml.html" )

@app.route("/result")
def result():
    return render_template("result.html" )


@app.route("/map")
def map():
    return render_template("map.html" )

@app.route("/status_group")
def s_group():
    name = status_group["status_group"].values.tolist()
    number = status_group["longitude"].values.tolist()

    plot_trace = {
        "x": name,
        "y": number,
        "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/map_data")
def test2():
    return jsonify(map_data)

#Run the app. debug=True is essential to be able to rerun the server any time changes are saved to the Python file
if __name__ == "__main__":
    app.run(debug=True, port=5027)