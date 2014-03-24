import requests, json
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
app.config.from_object(__name__)
app.config.update(dict(
    DEBUG=True
))
debug = True
data_url = "http://www.chrisshoff.com:1337/teams"

@app.route('/')
def show_table():
    """ Render the table template. Angular will 
    handle view switching after this.
    """
    return render_template('table.html')

@app.route('/teams')
def fetch_teams():
    """ Fetch the ordered list of teams from the server
    to display whether in standard table format, or
    in a Cann table format.
    """

    team_data = json.loads(requests.get(data_url).text)
    
    # if cann variable is set, do extra processing on the team rows
    # otherwise, return the list as is
    if request.args.get('cann') == "true":
        rows = [] # list of rows to return
        last_points = team_data[0][u'points'] # keep track of last team points, starting with first team
        i = 0
        while i < len(team_data):
            if last_points > team_data[i][u"points"]:
                for j in range(0, last_points - (team_data[i][u"points"]+1)):
                    # Append an empty row for each point between 
                    # this team's points and the last team's points
                    rows.append([])

            this_row = [team_data[i]] # Add this team to a list representing the teams in this row

            for j in range(i+1, len(team_data)):
                if team_data[i][u"points"] == team_data[j][u"points"]:
                    # Keep adding teams to this row, so long as their points are equal
                    this_row.append(team_data[j])

            i += len(this_row) # increment i for however many teams we added to this row
            rows.append(this_row)
            last_points = this_row[-1][u"points"]
        team_data = rows

    return jsonify(results=team_data)

@app.route('/teams/<int:id>')
def fetch_team(id):
    """ Fetch a single team by its id.
    """
    team_data = requests.get("/".join([data_url, str(id)]))
    return jsonify(results=json.loads(team_data.text))

@app.route('/teams/<string:name>')
def fetch_team_by_name(name):
    """ Fetch a single team by its slug.
    """
    team_data = requests.get(data_url)
    for team in json.loads(team_data.text):
       if team[u'slug'] == name:
        return jsonify(results=team)
    return jsonify(results=[])

if __name__ == "__main__":
    app.run()