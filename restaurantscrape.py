import requests
import array

class Dish:
    def __init__(self,id,name,description,imageId,inStock,price,veg,addons,variants):
        self.id=id
        self.name=name
        self.description=description
        self.imageId=f'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/{imageId}'
        self.inStock=inStock
        self.veg=veg
        self.price=int(price)/100
        self.addons=addons
        self.variants=variants

class Restinfo:
    def __init__(self,name,rating,people,time,fee):
        self.name=name
        self.rating=rating
        self.people=people
        self.time=time
        self.fee=fee

def restaurant_info(id):
    my_restaurant=f'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.5123388&lng=80.2329&restaurantId={id}&submitAction=ENTER'
    r= requests.get(my_restaurant)
    data = r.json()
    data=data['data']['cards'][0]['card']['card']['info']
    name =data.get('name')
    rating = data.get('avgRating')
    people = data.get('totalRatingsString')
    time = int(data.get('sla').get('maxDeliveryTime'))+10
    fee=0
    feedet=data.get('feeDetails')
    if(feedet):
        if(feedet.get('totalFees')): fee=int(feedet.get('totalFees'))/100
        if(feedet.get('totalFee')): fee=int(feedet.get('totalFee'))/100
        
    print(fee)
    return Restinfo(name,rating,people,time,fee)
    
    
    
    


def restaurant_details(id):
    my_restaurant=f'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.5123388&lng=80.2329&restaurantId={id}&submitAction=ENTER'
    # print(my_restaurant)
    r= requests.get(my_restaurant)
    data = r.json()

    restaurant_array = data['data']['cards'][-1]['groupedCard']['cardGroupMap']['REGULAR'] ['cards']
    
    
    
    # print(restaurant_array[1]['card']['card']['title'])
    while(restaurant_array[1]['card']['card']['title']=="Top Picks"):
        restaurant_array=restaurant_array[1:]
    else: 
        restaurant_array=restaurant_array[0:]

    dish_list = []

    for category in restaurant_array:
        
        data = category['card']['card']
        category_title = data.get('title')
        # print(category_title,data.get('@type'))
        dishes= data.get('itemCards')
        if dishes is not None and len(dishes) > 0:
            for dish in dishes:
                dishinfo = dish['card']['info']
                id = dishinfo.get('id')
                name = dishinfo.get('name')
                description = dishinfo.get('description')
                imageId = dishinfo.get('imageId')
                inStock = dishinfo.get('inStock')
                price = dishinfo.get('price')
                addons=dishinfo.get('addons')
                variants=dishinfo.get('variantsV2')
                if(variants==None): variants=dishinfo.get('variants')
                if addons == None:
                    addons=0
                else : addons=len(addons)    
                if variants == None or variants.get('variantGroups')==None:
                    variants=0
                else : 
                    variants=len(variants.get('variantGroups'))

                if(price==None): price=dishinfo.get('defaultPrice')
                
                # write here
                veg='VEG'
                if(dishinfo.get('itemAttribute')!=None):
                    veg=dishinfo.get('itemAttribute').get('vegClassifier')
                # ribbon=dishinfo['itemAttribute']['ribbon']
                dish_list.append(Dish(id,name,description,imageId,inStock,price,veg,addons,variants))
                # print(id,name,description,imageId,inStock,price,veg)


    return dish_list

def getdish(restid,dishid):
    print(dishid)
    my_restaurant=f'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.5123388&lng=80.2329&restaurantId={restid}&submitAction=ENTER'
    r= requests.get(my_restaurant)
    data = r.json()

    restaurant_array = data['data']['cards'][-1]['groupedCard']['cardGroupMap']['REGULAR'] ['cards']

    # print(restaurant_array[1]['card']['card']['title'])
    while(restaurant_array[1]['card']['card'].get('title')=="Top Picks"):
        restaurant_array=restaurant_array[1:]
    else: 
        restaurant_array=restaurant_array[0:]

    for category in restaurant_array:
        
        data = category['card']['card']
        dishes= data.get('itemCards')
        if dishes is not None and len(dishes) > 0:
            for dish in dishes:
                dishinfo = dish['card']['info']
                dish_id = dishinfo.get('id')
                # print(dish_id)
                if(int(dish_id)==int(dishid)): 
                    print("hi")
                    return  dishinfo
                
    return {}




