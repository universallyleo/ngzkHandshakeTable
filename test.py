import os
import json

firebase_cred = json.loads(os.environ["FIREBASE_KEY"])
print(firebase_cred["project_id"])
