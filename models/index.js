var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
	    set      : function(val) {
	      this.setDataValue('title', val.toUpperCase());
	    }

    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    route: {
	    get      : function()  {
	      var title = this.getDataValue('title');
	      // 'this' allows you to access attributes of the instance
	      return this.getDataValue('name') + ' (' + title + ')';
	    },
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
});

module.exports = {
  Page: Page,
  User: User
};