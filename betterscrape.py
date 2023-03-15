import requests
import array

relevant_rest = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.5123388&lng=80.2329&offset=0&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING'

r= requests.get(relevant_rest)
data = r.json()

class Restaurants:
    def __init__(self,id,name,uuid,cloudinary):
        self.id=id
        self.name=name
        self.uuid=uuid
        self.cloudinary=f'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/{cloudinary}'

rest_list=[]

for item in data['data']['cards']:
    main = item['data']['data']
    id = main.get('id')
    name=main.get('name')
    uuid=main.get('uuid')
    cloudinaryImageId=main.get('cloudinaryImageId')
    rest_list.append(Restaurants(id,name,uuid,cloudinaryImageId))


# for rest in rest_list:
#     print(rest.id, rest.name,rest.cloudinary)









