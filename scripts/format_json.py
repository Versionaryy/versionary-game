import json
import os
import sys

rootdir = 'src'

format_type = sys.argv[1]

for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        ext = os.path.splitext(file)[-1].lower()
        if ext == '.json':
            filename = os.path.join(subdir, file)
            print(filename)
            with open(filename, 'r', encoding='utf-8') as json_file:
                try:
                    json_object = json.load(json_file)
                except json.JSONDecodeError as e:
                    print(f"[ERROR] Failed to parse {filename}: {e}")
                    sys.exit(1)
            f = open(filename, 'w')
            if format_type == 'prettify':
                f.write(json.dumps(json_object, indent=2))
            elif format_type == 'minify':
                f.write(json.dumps(json_object, separators=(',', ':')))
            f.close()