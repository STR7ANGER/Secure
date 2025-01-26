import contextlib
from elasticsearch import Elasticsearch, helpers
from datetime import datetime

def connect_elasticsearch():
    _es = None
    # _es = Elasticsearch("http://13.234.237.238:9200/")  # Replace with your Elasticsearch URL
    _es = Elasticsearch("http://localhost:9200/")
    if _es.ping():
        print('Yay Connected')
    else:
        print('Could not connect!')
    return _es

es = connect_elasticsearch()

def delete_index(es_object, index_name):
    try:
        if es_object.indices.exists(index_name):
            es_object.indices.delete(index=index_name)
            print(f'Index {index_name} deleted')
    except Exception as ex:
        print(f'Error deleting index: {ex}')

def create_index(es_object, index_name):
    created = False
    settings = {
        "settings": {
            "number_of_shards": 1,
            "number_of_replicas": 0,
            "mapping": {
                "total_fields": {
                    "limit": 100000  # Adjust the field limit here
                }
            }
        },
        "mappings": {
            "properties": {
                "id": {"type": "text"},
                "timestamp": {"type": "date"}
                # Add any other specific mappings here
            }
        }
    }
    try:
        if not es_object.indices.exists(index_name):
            es_object.indices.create(index=index_name, ignore=400, body=settings)
            print('Created Index')
        created = True
    except Exception as ex:
        print(ex)
    return created


def clean_data(record):
    if isinstance(record, dict):
        return {k: clean_data(v) for k, v in record.items()}
    elif isinstance(record, list):
        return [clean_data(item) for item in record]
    else:
        return str(record)

def store_record(elastic_object, index_name, record):
    is_stored = True
    try:
        outcome = elastic_object.index(index=index_name, body=record)
        print(outcome)
    except Exception as ex:
        breakpoint()
        print('Error in indexing data')
        print(ex)
        is_stored = False
    return is_stored

def insert_elasticdb(result, index_name, current_time):
    result["timestamp"] = current_time
    format_result = clean_data(result)
    if es is not None and create_index(es, index_name):
        out = store_record(es, index_name, format_result)
        print("insert_elasticdb", index_name, format_result)

def delete_elasticdb(indices):
    if es is not None and indices:
        es.delete_by_query(index=indices, body={"query": {"match_all": {}}})
        print('Index successfully CLEARED', indices)
