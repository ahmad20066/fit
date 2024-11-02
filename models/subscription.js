const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./user')
const Package = require('./package')

const Subscription = sequelize.define("Subscription", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        allowNull: false,
    },
    package_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Package,
            key: "id",
        },
        allowNull: false,
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    subscription_type: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.package_id === 1 ? 'group' : this.package_id === 2 ? 'personalized' : 'unknown';
        }
    }
}, {
    tableName: "subscriptions",
    timestamps: true,
});

module.exports = Subscription;
