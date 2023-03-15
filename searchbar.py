import requests

def function(query):
    query = query.replace(" ", "%20")
    url=f'https://www.swiggy.com/dapi/restaurants/search/v3?lat=26.5123388&lng=80.2329&str={query}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=d4376388-fedb-8137-40a0-b7583a198f6b&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22bztsstoaf5iomfihcdt8%22%2C%22dishFamilyId%22%3A%22846706%22%2C%22dishFamilyIds%22%3A%5B%22846706%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D';

    r= requests.get(url)
    data = r.json()
    class Restaurants:
        def __init__(self,id,name,cloudinary):
            self.id=id
            self.name=name
            self.cloudinary=f'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/{cloudinary}'

    restarray = data['data']['cards'][-1]['groupedCard']['cardGroupMap']['DISH']['cards'][1:]

    searchquery = []
    for rest in restarray:
        rest=rest['card']['card']['restaurant']['info']
        id=rest.get('id')
        name=rest.get('name')
        cloudinary=rest.get('cloudinaryImageId')
        newrest= Restaurants(id,name,cloudinary)
        add=1
        for rest in searchquery:
            if rest.name==newrest.name:
                add=0
                break
        if add==1: searchquery.append(newrest)
    return searchquery
        

        
        