import json
import flask
from flask import request

application = flask.Flask(__name__)


@application.route("/", methods=['POST','GET'])

def index():
	return flask.render_template("index.html")
		
			
	# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()