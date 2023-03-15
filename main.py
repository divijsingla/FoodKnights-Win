from flask import Flask, render_template, request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from betterscrape import rest_list
from searchbar import function
from restaurantscrape import restaurant_details,restaurant_info
from sqlalchemy import create_engine, Column, Integer, String, ARRAY
from sqlalchemy.orm import sessionmaker, declarative_base
from variants import variants,variants2,addons

import json

app = Flask(__name__,static_url_path='/static')
# create a PostgreSQL database engine
# engine = create_engine('postgresql://d:@127.0.0.1:5432/d')

# # define a table
# Base = declarative_base()

# class Order(Base):
#     __tablename__ = 'orders'

#     orderid = Column(Integer, primary_key=True, autoincrement=True)
#     username = Column(String)
#     restaurant_id = Column(Integer)
#     dishes=Column(ARRAY(String))
#     price=Column(Integer)
    
#     def __init__(self, username,restaurant_id,dishes,price):
#         self.orderid = orderid
#         self.username=username
#         self.restaurant_id = restaurant_id
#         self.dishes=dishes
#         self.price=price
        

# # create the table in the database
# Base.metadata.create_all(engine)
# Session = sessionmaker(bind=engine)
# session = Session()

orderid=0
# @app.route('/restaurant/<int:restaurantid>/<int:dishid>/<int:opt1>/<int:opt2>/addons')
# def addonday(restaurantid,dishid,opt1,opt2):
#     addonlist = addons(restaurantid,dishid,opt1,opt2) 
#     print(addonlist)
#     return render_template('addons.html',addonlist=addonlist)

# @app.route('/restaurant/<int:restaurantid>/<int:dishid>/<int:opt2>/addons')
# def addonday2(restaurantid,dishid,opt2):
#     addonlist = addons(restaurantid,dishid,0,opt2) 
#     print(addonlist)
#     return render_template('addons.html',addonlist=addonlist)

@app.route('/hiaddons2', methods=['POST'])
def add2():
    data = request.get_json()
    # do something with data
    restaurantid=int(data['restid'])
    dishid=int(data['itemid'])
    opt2=int(data['opt2']['id'])
    addonlist = addons(restaurantid,dishid,0,opt2) 
    print(addonlist)
    return render_template('addons.html',addonlist=addonlist)
    
    
@app.route('/hiaddons', methods=['POST'])
def add():
    data = request.get_json()
    # do something with data
    restaurantid=int(data['restid'])
    dishid=int(data['itemid'])
    opt1=int(data['opt1']['id'])
    opt2=int(data['opt2']['id'])
    addonlist = addons(restaurantid,dishid,opt1,opt2) 
    print(addonlist)
    return render_template('addons.html',addonlist=addonlist) 
    
@app.route('/')
def home():
    return render_template('index.html',restlist=rest_list)

# @app.route('/restaurant/<int:restaurantid>/<int:dishid>/<int:num>')
# def dishvariants(restaurantid,dishid,num):
#     thevariants=variants(restaurantid,dishid,num) 
#     if(thevariants==-1):return restaurant_page(restaurantid)
#     else:
#         return render_template('variants.html',variants=thevariants)

# @app.route('/restaurant/<int:restaurantid>/<int:dishid>/<int:num>/<int:opt1>')
# def dishvariants2(restaurantid,dishid,num,opt1):
#     thevariants=variants2(restaurantid,dishid,num,opt1) 
#     if(thevariants==-1):return restaurant_page(restaurantid)
#     else:
#         return render_template('variants.html',variants=thevariants)

@app.route('/checkout')
def final():
    return render_template('final.html')

@app.route('/variantintro2', methods=['POST'])
def vv2():
    data = request.get_json()
    # do something with data
    restaurantid=int(data['restid'])
    dishid=int(data['itemid'])
    num=int(data['variants'])
    opt1=int(data['opt1']['id'])
    thevariants=variants2(restaurantid,dishid,num,opt1) 
    print(thevariants)
    if(thevariants==-1):return restaurant_page(restaurantid)
    else:
        return render_template('variants.html',variants=thevariants)
    
# @app.route('/restaurant/${restid}/${dishid}/${opt1}/${selectedOption}/addons')

@app.route('/searchquery', methods=['POST'])
def search():
    data = request.get_json()
    # do something with data
    query=data['key']
    if(query=='') : return render_template('templater.html',restlist=rest_list)
    return render_template('templater.html',restlist=function(query))

@app.route('/variantintro', methods=['POST'])
def vv():
    data = request.get_json()
    # do something with data
    restaurantid=int(data['restid'])
    dishid=int(data['itemid'])
    num=int(data['variants'])
    thevariants=variants(restaurantid,dishid,num) 
    if(thevariants==-1):return restaurant_page(restaurantid)
    else:
        return render_template('variants.html',variants=thevariants)

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/restaurant/<int:restaurant_id>')
def restaurant_page(restaurant_id):
    # Generate product page for the given product ID
    return render_template('restaurant.html', dish_list=restaurant_details(restaurant_id),restinfo=restaurant_info(restaurant_id),restid=restaurant_id)


        

# @app.route('/save_data', methods=['POST'])
# def save_data():
#     data = request.get_json()
#     # print('Received data:', data)
    
#     if 'restid' in data:
#         restid=data['restid']
#     else:
#         return 'Cart is Empty!'
    
#     dishlist= data['dishlist']
#     user=data['user']
    
    
    
#     # do something with the data
#     price=data['finalprice']
#     order = Order(user,int(restid),dishlist,float(price))
#     session.add(order)
#     session.commit()
#     return 'Data added to database'



if __name__=='__main__':
    app.run(debug=True, port=8000)

