import os
import json

firebase_cred = json.loads(os.environ["FIREBASE_KEY"])
print("Firebase read success, project id: ")
print(firebase_cred["project_id"])
