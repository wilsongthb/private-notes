from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin


class CompatibleMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        if request.method == 'OPTIONS':
            response = HttpResponse()
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD"
            response["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, content-type, Authorization"
            return response

        response = self.get_response(request)
        # Code to be executed for each request/response after
        # the view is called.
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD"
        response["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, content-type, Authorization"
        return response


class CorsMiddleware():
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        if request.method == 'OPTIONS':
            response = HttpResponse()
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD"
            response["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, content-type, Authorization"
            return response
        response = self.get_response(request)
        # Code to be executed for each request/response after
        # the view is called.
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD"
        response["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, content-type, Authorization"
        return response
