from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view

COINGECKO_URL = "https://api.coingecko.com/api/v3/coins/markets"

@api_view(['GET'])
def get_prices(request):
    coins = request.GET.get("coins", "bitcoin,ethereum")
    url = f"{COINGECKO_URL}?vs_currency=usd&ids={coins}"
    
    try:
        r = requests.get(url)
        data = r.json()
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    



def home(request):
    return render(request, "index.html")
