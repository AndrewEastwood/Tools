{
    configuredStyles : {
        /* TODO: use elementsMap values to fill this json */
        ratingIcons : {
            summaryStars : {
                subStyles : {
                    full : { color: '@images.OverallRating.full', size: '@images.OverallRating.size' },
                    empty : { color: '@images.OverallRating.empty', size: '@images.OverallRating.size' }
                }
            },
            bars: {
                subStyles : {
                    full : { color: '@images.SecondaryRating.full', size: '@images.SecondaryRating.size' },
                    empty : { color: '@images.SecondaryRating.empty', size: '@images.SecondaryRating.size' }
                }
            },
            reviewStars: {
                subStyles : {
                    full : { color: '@images.OverallRating.full', size: '@images.OverallRating.size' },
                    empty : { color: '@images.OverallRating.empty', size: '@images.OverallRating.size' }
                }
            }
        },
        backgroundTab : {
            "section-header" : {color : "transparent"},
            "prs-container" : {color : "transparent"},
            "section-header-controls" : {color : "transparent"},
            button : {
                color : "transparent",
                subStyles: {
                    primary: { color: "#0B5681" },
                    hover: { color: "#0B5681" }
                }
            },
            "content-summary": {color: "transparent" },
            "content-item": {color: "transparent" },
            "content-header": {color: "transparent" }
        },
        marginAndPadding: {
            "prs-container": {
                margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
            },
            "content-summary": {
                margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
            },
            "content-item": {
                margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
            },
            "content-header": {
                margin: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 },
                padding: { uniform: false, bottom: 0, left: 0, right: 0, top: 0 }
            }
        },
        fonts: {
            body: {
                lineHeight: '@text.RootElement.line-height',
                sampleBackgroundColor: "@text.RootElement.background-color",
                color: "@text.RootElement.color",
                family: "@text.RootElement.font-family",
                //// ?? familyID: "sniffedFontFamily1637882686",
                textTransform: "@text.RootElement.text-transform",
                characterStyles: [ "@text.RootElement.text-transform", "@text.RootElement.text-transform" ],
                size: "@text.RootElement.font-size"
            },
            button: {
                lineHeight: 19.5,
                sampleBackgroundColor: "black",
                color: "#FFFFFF",
                family: "Arial, Helvetica, sans-serif",
                // ?? familyID: "fontFamily2",
                textTransform: "none",
                characterStyles: [ "bold" ],
                subStyles: {
                    button: {
                        lineHeight: 16.5,
                        sampleBackgroundColor: "white",
                        color: "#FFF",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "uppercase",
                        characterStyles: [ "bold" ],
                        size: 12
                    },
                    active: {
                        lineHeight: 16.5,
                        sampleBackgroundColor: "white",
                        color: "#FFF",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "uppercase",
                        characterStyles: [ "bold" ],
                        size: 12
                    },
                    hover: {
                        lineHeight: 16.5,
                        sampleBackgroundColor: "white",
                        color: "#FFF",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "uppercase",
                        characterStyles: [ "bold" ],
                        size: 12
                    }
                },
                size: 13
            },
            pageHeader: {
                lineHeight: 16.5,
                sampleBackgroundColor: "white",
                color: "#4B4B4B",
                family: "Arial, sans-serif",
                // ?? familyID: "sniffedFontFamily1637882686",
                textTransform: "none",
                characterStyles: [ "bold" ],
                size: 14
            },
            ugcDate: {
                lineHeight: 16.5,
                sampleBackgroundColor: "white",
                color: "#4B4B4B",
                family: "Arial, sans-serif",
                // ?? familyID: "sniffedFontFamily1637882686",
                textTransform: "none",
                characterStyles: [ ],
                size: 11
            },
            sectionHeader: {
                lineHeight: 16.5,
                sampleBackgroundColor: "white",
                color: "#4B4B4B",
                family: "Arial, sans-serif",
                // ?? familyID: "sniffedFontFamily1637882686",
                textTransform: "none",
                characterStyles: [ "bold" ],
                size: 12
            },
            link: {
                lineHeight: 19.5,
                family: "Arial, Helvetica, sans-serif",
                // ?? familyID: "fontFamily2",
                textTransform: "none",
                characterStyles: [ ],
                subStyles: {
                    visited: {
                        lineHeight: 16.5,
                        sampleBackgroundColor: "white",
                        color: "#2A5A97",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "none",
                        characterStyles: [ ],
                        size: 12
                    },
                    link: {
                        lineHeight: 16.5,
                        sampleBackgroundColor: "white",
                        color: "#2A5A97",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "none",
                        characterStyles: [ ],
                        size: 12
                    },
                    active: {
                        lineHeight: 16.5,
                        sampleBackgroundColor: "white",
                        color: "#2A5A97",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "none",
                        characterStyles: [ ],
                        size: 12
                    },
                    hover: {
                        lineHeight: 16.5,
                        sampleBackgroundColor: "white",
                        color: "#2A5A97",
                        family: "Arial, sans-serif",
                        textTransform: "none",
                        characterStyles: [ ],
                        size: 12
                    }
                },
                size: 13
            },
            labels: {
                lineHeight: 16.5,
                sampleBackgroundColor: "white",
                color: "#4B4B4B",
                family: "Arial, sans-serif",
                textTransform: "none",
                characterStyles: [ ],
                size: 12
            },
            dimensionValues: {
                lineHeight: 16.5,
                sampleBackgroundColor: "white",
                color: "#4B4B4B",
                family: "Arial, sans-serif",
                textTransform: "none",
                characterStyles: [ ],
                size: 12
            },
            sectionHeaderControls: {
                lineHeight: 16.5,
                sampleBackgroundColor: "white",
                color: "#4B4B4B",
                family: "Arial, sans-serif",
                textTransform: "none",
                characterStyles: [ ],
                size: 12
            },
            ugcName: {
                lineHeight: 16.5,
                sampleBackgroundColor: "white",
                color: "#2A5A97",
                family: "Arial, sans-serif",
                textTransform: "none",
                characterStyles: [ "bold" ],
                size: 12
            }
        },
        borders: {
            "button-primary": {
                bottomRightRadius: 3,
                bottomLeftRadius: 3,
                topRightRadius: 3,
                bottom: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                left: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                right: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                topLeftRadius: 3,
                radiiLocked: true,
                top: {
                    style: "none",
                    color: "transparent",
                    width: 0
                }
            },
            "prs-container": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                left: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                right: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "none",
                    color: "transparent",
                    width: 0
                }
            },
            "button-secondary": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                left: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                right: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "none",
                    color: "transparent",
                    width: 0
                }
            },
            "content-summary": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                left: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                right: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "none",
                    color: "transparent",
                    width: 0
                }
            },
            "content-item": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                left: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                right: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "none",
                    color: "transparent",
                    width: 0
                }
            },
            "content-header": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                left: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                right: {
                    style: "none",
                    color: "transparent",
                    width: 0
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "none",
                    color: "transparent",
                    width: 0
                }
            }
        }
    }
}