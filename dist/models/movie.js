"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = __importStar(require("sequelize"));
const config_1 = require("../config");
const sequelize = config_1.Database.sequelize;
const Movie = sequelize.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imdbScore: {
        type: Sequelize.DECIMAL(2, 1),
        defaultValue: 0.0,
        allowNull: false,
    },
    directorId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'directors',
            key: 'id'
        }
    },
    actors: {
        // 'Salman Khan, Sarukh Khan'
        type: Sequelize.STRING,
        allowNull: false,
    },
    genreId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'movies',
            key: 'id'
        }
    },
    description: {
        type: Sequelize.TEXT,
    },
    thumbnailUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    embedVideoUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    avgRatings: {
        type: Sequelize.DECIMAL(2, 1),
        defaultValue: 0.0,
        allowNull: false,
    },
    totalRatings: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    duration: {
        type: Sequelize.STRING,
    },
    releasedAt: {
        type: Sequelize.DATE,
    }
}, {
    timestamps: false,
});
exports.default = Movie;
