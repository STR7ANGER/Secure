import sys
import os
import subprocess
from datetime import datetime
import json

requirements = ["requests==2.28.1", "elasticsearch==7.*"]

for dependency in requirements:
    subprocess.check_call([sys.executable, "-m", "pip", "install", dependency])
    reqs = subprocess.check_output([sys.executable, "-m", "pip", 'freeze'])

from elasticsearch_insert_func import insert_elasticdb

def load_json_data(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def test():
    print("the inventory inside elastic running at:", datetime.now().isoformat())

    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_file_path = os.path.join(script_dir, 'demo-monthly-reports.json')
    json_data = load_json_data(json_file_path)
    objects_list = json_data
    objects_list = objects_list[:15]

    index_name = "monthly_report_index"
    current_time = datetime.now().isoformat()

    for obj in objects_list:
        insert_elasticdb(obj, index_name, current_time)

if __name__ == '__main__':
    test()
    from datetime import datetime
    print(f"{datetime.now()} - The scheduled job AZURE is over")
