import requests, json
from flask import Flask, render_template, jsonify

app = Flask(__name__)
app.config.from_object(__name__)
app.config.update(dict(
    DEBUG=True
))
debug = True
data_url = "http://www.chrisshoff.com:1337/teams"

@app.route('/')
def show_table():
    return render_template('table.html')

@app.route('/teams')
def fetch_teams():
    team_data = requests.get(data_url)
    return jsonify(results=json.loads(team_data.text))

@app.route('/teams/<int:id>')
def fetch_team(id):
    team_data = requests.get("/".join([data_url, str(id)]))
    return jsonify(results=json.loads(team_data.text))

@app.route('/teams/<string:name>')
def fetch_team_by_name(name):
    team_data = requests.get(data_url)
    for team in json.loads(team_data.text):
       if team[u'slug'] == name:
        return jsonify(results=team)
    return jsonify(results=[])

if __name__ == "__main__":
    app.run()