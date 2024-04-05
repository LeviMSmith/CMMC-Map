import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            raw_token = request.COOKIES.get("access")  # Your access token cookie name
            if raw_token is None:
                return None
        else:
            raw_token = self.get_raw_token(header)
            if raw_token is None:
                return None

        try:
            validated_token = self.get_validated_token(raw_token)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return self.get_user(validated_token), validated_token
