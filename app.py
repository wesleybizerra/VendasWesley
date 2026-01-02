import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import mercadopago

app = Flask(__name__)
CORS(app) # Permite que seu site converse com este servidor

# O Token será pego das configurações do Render por segurança
sdk = mercadopago.SDK(os.environ.get("MP_ACCESS_TOKEN"))

@app.route('/')
def index():
    return "Servidor LuxStore Ativo!"

@app.route('/create_preference', methods=['POST'])
def create_preference():
    try:
        data = request.json
        preference_data = {
            "items": data['items'],
            "back_urls": {
                "success": "https://seusite.netlify.app/#/success",
                "failure": "https://seusite.netlify.app/#/checkout",
            },
            "auto_return": "approved",
        }
        result = sdk.preference().create(preference_data)
        return jsonify(result["response"])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))