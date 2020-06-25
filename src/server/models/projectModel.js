//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const validator = require('validator')
// modules
const AppError = require('./../utils/AppError')
const nextSeq = require('./sequenceModel')
const { getAllTags } = require('./../../common/datamodel/jrc-taxonomy')

const isValidTerm = value => {
    const allTags = getAllTags()
    value.forEach(term => {
        if (!allTags.includes(term)) throw new AppError(`${term} is an invalid tag.`, 400)
    })
}

const projectSchema = new mongoose.Schema(
    {
        // cloudwatch gives it a unique id - automatically set using a sequence!!
        cw_id: {
            type: Number,
            unique: true
        },
        // a short name (usually an abbreviation)
        name: {
            type: String,
            required: true
        },
        // the unique RCN number assigned by the EC when awarded.
        rcn: {
            type: Number,
            required: true,
            unique: true
        },
        // the full title of the project
        title: {
            type: String,
            required: true
        },
        // a short teaser text describing the project
        teaser: {
            type: String,
            required: true
        },
        // the project's start date
        startDate: {
            type: Date,
            required: true
        },
        // the project's end date
        endDate: {
            type: Date,
            required: true
        },
        // # classifications for this project
        hasClassifications: {
            type: Boolean,
            default: false
        },
        // # scores for this project
        hasScores: {
            type: Boolean,
            default: false
        },
        // the EC funding call
        call: String,
        // project type (mostly IA, RIA, RA, or CSA)
        type: String,
        // the project's total budget (EC contrib plus partner's own contribs)
        budget: Number,
        // project home page
        projectURL: {
            type: String,
            validate: validator.isURL
        },
        // the link to more info from the funding body
        fundingBodyLink: {
            type: String,
            validate: validator.isURL
        },
        // URL to the CW ProjectHub
        cwurl: {
            type: String,
            validate: [validator.isURL, 'Invalid URL.']
        },
        tags: {
            type: [String],
            validate: {
                validator: isValidTerm,
                message: props => `${props.value} is not a valid JRC taxonomy term tag!`
            }
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

//
// SCHEMA MIDDLEWARE
//
// ensure that cw_id gets a unique number.
projectSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.cw_id = await nextSeq('project')
    }

    next()
})

//
// INDEXES
//
projectSchema.index({ cw_id: 1 }) // index on the project's CW id
projectSchema.index({ name: 1 }) // index on the project's CW id
projectSchema.index({ rcn: 1 }) // index on the project's RCN
projectSchema.index({ name: 'text', title: 'text', teaser: 'text' }) // text indexes for textual search

//
// MODEL
//
const Project = mongoose.model('Project', projectSchema)

//
// EXPORTS
//
module.exports = { Project, projectSchema }
