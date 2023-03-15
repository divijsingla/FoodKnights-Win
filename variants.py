import requests
import array
import json
from restaurantscrape import getdish

def variants(restid,dishid,num):
    dishobj=getdish(restid,dishid)
    variants = dishobj.get('variantsV2')
    if(variants==None or len(variants)==0):
        variants=dishobj.get('variants')
    if(variants==None or len(variants)==0):
        return -1
    
    else :
        groups=variants.get('variantGroups')
        pricingmodels=variants.get('pricingModels')
        grpcopy = groups[len(groups)-num]
        for variation in grpcopy.get('variations'):
            varid = variation.get('id')
            for pricingmodel in pricingmodels:
                if(pricingmodel.get('variations')[0].get('variationId')==varid):
                    variation['totprice']=pricingmodel.get('price')
        # if(len(groups)<=num): return -1
        return grpcopy
        # if(len(groups)<=num): return -1
        return groups[len(groups)-num]
        
def variants2(restid,dishid,num,opt1):
    dishobj=getdish(restid,dishid)
    variants = dishobj.get('variantsV2')
    if(variants==None or len(variants)==0):
        variants=dishobj.get('variants')
    if(variants==None or len(variants)==0):
        return -1
    else :
        groups=variants.get('variantGroups')
        if(len(groups)<=num): return -1
        pricingmodels=variants.get('pricingModels')
        nextlisttoshow=[]
        if pricingmodels is not None and len(pricingmodels) > 0:
            for pricingmodel in pricingmodels:
                variations= pricingmodel.get('variations')
                if(len(variations)>=2):
                 if(int(variations[0].get('variationId'))==int(opt1)):
                    # print(int(variations[1].get('variationId')))
                    nextlisttoshow.append({'id':int(variations[1].get('variationId')),'price':int(pricingmodel.get('price'))})
                
                    
                    
            group=groups[1]
            variations = group.get('variations')
            newvariations=[]
            for variation in variations:
                for obj in nextlisttoshow:
                    if(obj['id']==int(variation.get('id'))):
                        newv=variation
                        newv['totprice']=obj['price']
                        newvariations.append(newv)
                    
                
                
                # if int(variation.get('id')) in nextlisttoshow:
                #     newvariations.append(variation)
             
        
            group['variations']=newvariations
            return group
    
def addons(restid,dishid,opt1,opt2):
    dishobj=getdish(restid,dishid)
    variants = dishobj.get('variantsV2')
    addons = dishobj.get('addons')
    # print(len(addons))
    addonscodelist=[]
    if(variants==None or len(variants)==0):
        variants=dishobj.get('variants')
    if(variants==None or len(variants)==0):
        return -1
    
    else :
        pricingmodels=variants.get('pricingModels')
        if pricingmodels is not None and len(pricingmodels) > 0:
            
            if(len(pricingmodels[0].get('variations'))==2):
                for pricingmodel in pricingmodels:                    
                    i1=pricingmodel.get('variations')[0].get('variationId')
                    i2=pricingmodel.get('variations')[1].get('variationId')
                    print(i1,i2)
                    if(int(i1)==int(opt1) and int(i2)==int(opt2)):
                        print("hii")
                        addoncombos = pricingmodel.get('addonCombinations')
                        if addons is not None and len(addons)>0:
                            for addon in addons:
                                grpid=addon.get('groupId')
                                grpname=addon.get('groupName')
                                maxaddons=addon.get('maxAddons')
                                minaddons=addon.get('minAddons')
                                addonscodelist.append({'grpId':grpid,'grpName':grpname,'maxAddons':maxaddons,'minAddons':minaddons,'addons':[]})
                                choices=addon.get('choices')
                                if choices is not None and len(choices)>0:
                                    for choice in choices:
                                        choiceid=choice.get('id')
                                        for addoncombo in addoncombos:
                                            if(addoncombo.get('groupId')==grpid and addoncombo.get('addonId')==choiceid):
                                                newc=choice
                                                theprice=newc.get('price')
                                                if(theprice==None): theprice=0
                                                else: theprice=int(int(theprice)/100)
                                                newc['price']=theprice
                                                addonscodelist[-1]['addons'].append(choice)

            if(len(pricingmodels[0].get('variations'))==1):
                for pricingmodel in pricingmodels:                    
                    i1=pricingmodel.get('variations')[0].get('variationId')
                    if(int(i1)==int(opt2)):
                        addoncombos = pricingmodel.get('addonCombinations')
                        if addons is not None and len(addons)>0:
                            for addon in addons:
                                grpid=addon.get('groupId')
                                grpname=addon.get('groupName')
                                maxaddons=addon.get('maxAddons')
                                minaddons=addon.get('minAddons')
                                # print(grpid)
                                addonscodelist.append({'grpId':grpid,'grpName':grpname,'maxAddons':maxaddons,'minAddons':minaddons,'addons':[]})
                                choices=addon.get('choices')
                                if choices is not None and len(choices)>0:
                                    for choice in choices:
                                        choiceid=choice.get('id')
                                        for addoncombo in addoncombos:
                                            if(addoncombo.get('groupId')==grpid and addoncombo.get('addonId')==choiceid):
                                                newc=choice
                                                theprice=newc.get('price')
                                                if(theprice==None): theprice=0
                                                else: theprice=int(int(theprice)/100)
                                                newc['price']=theprice
                                                addonscodelist[-1]['addons'].append(choice)
        print(addonscodelist)
        return addonscodelist               
                            
                            
                                
                                
                        
                    
                     
   
 