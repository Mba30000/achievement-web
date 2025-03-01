import jwt
import datetime

# Define the secret key
SECRET_KEY = "potato"  # Replace with your actual secret key

# Encode the JWT
def encode_jwt():
    # Define the payload (data you want to store in the token)
    payload = {
        "sub": 123,  # Example subject (user ID, etc.)
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # 1-hour expiration
    }

    # Encode the JWT using the secret key and algorithm (HS256)
    encoded_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    print("Encoded Token:", encoded_token)
    return encoded_token

# Decode the JWT
def decode_jwt(encoded_token):
    try:
        # Decode the JWT using the same SECRET_KEY
        decoded_payload = jwt.decode(encoded_token, SECRET_KEY, algorithms=["HS256"])
        print("Decoded Payload:", decoded_payload)
        return decoded_payload
    except jwt.ExpiredSignatureError:
        print("The token has expired.")
    except jwt.InvalidTokenError:
        print("Invalid token. Signature verification failed.")

# Example of encoding and decoding
encoded_token = encode_jwt()
decoded_payload = decode_jwt(encoded_token)