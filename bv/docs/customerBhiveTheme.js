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
            "section-header" : {color : "@text.SectionHeader.background-color"},
            "prs-container" : {color : "@text.RatingSummary.background-color"},
            "section-header-controls" : {color : "transparent"},
            button : {
                color : "@text.Links.active.color",
                subStyles: {
                    primary: { color: "@text.Links.active.color" },
                    hover: { color: "@text.Links.active.color" }
                }
            },
            "content-summary": {color: "@text.ReviewContent.background-color" },
            "content-item": {color: "@text.ReviewItem.background-color" },
            "content-header": {color: "@text.ReviewTitles.background-color" }
        },
        marginAndPadding: {
            "prs-container": {
                margin: { uniform: false, bottom: '@marginAndPadding.RatingSummary.margin-bottom', left: '@marginAndPadding.RatingSummary.margin-left', right: '@marginAndPadding.RatingSummary.margin-right', top: '@marginAndPadding.RatingSummary.margin-top' },
                padding: { uniform: false, bottom: '@marginAndPadding.RatingSummary.padding-bottom', left: '@marginAndPadding.RatingSummary.padding-left', right: '@marginAndPadding.RatingSummary.padding-right', top: '@marginAndPadding.RatingSummary.padding-top' }
            },
            "content-summary": {
                margin: { uniform: false, bottom: '@marginAndPadding.ContentSummary.margin-bottom', left: '@marginAndPadding.ContentSummary.margin-left', right: '@marginAndPadding.ContentSummary.margin-right', top: '@marginAndPadding.ContentSummary.margin-top' },
                padding: { uniform: false, bottom: '@marginAndPadding.ContentSummary.padding-bottom', left: '@marginAndPadding.ContentSummary.padding-left', right: '@marginAndPadding.ContentSummary.padding-right', top: '@marginAndPadding.ContentSummary.padding-top' }
            },
            "content-item": {
                margin: { uniform: false, bottom: '@marginAndPadding.ContentItem.margin-bottom', left: '@marginAndPadding.ContentItem.margin-left', right: '@marginAndPadding.ContentItem.margin-right', top: '@marginAndPadding.ContentItem.margin-top' },
                padding: { uniform: false, bottom: '@marginAndPadding.ContentItem.padding-bottom', left: '@marginAndPadding.ContentItem.padding-left', right: '@marginAndPadding.ContentItem.padding-right', top: '@marginAndPadding.ContentItem.padding-top' }
            },
            "content-header": {
                margin: { uniform: false, bottom: '@marginAndPadding.ContentHeader.margin-bottom', left: '@marginAndPadding.ContentHeader.margin-left', right: '@marginAndPadding.ContentHeader.margin-right', top: '@marginAndPadding.ContentHeader.margin-top' },
                padding: { uniform: false, bottom: '@marginAndPadding.ContentHeader.padding-bottom', left: '@marginAndPadding.ContentHeader.padding-left', right: '@marginAndPadding.ContentHeader.padding-right', top: '@marginAndPadding.ContentHeader.padding-top' }
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
                characterStyles: [ "@text.RootElement.font-style", "@text.RootElement.font-weight" ],
                size: "@text.RootElement.font-size"
            },
            button: {
                lineHeight: "@text.Links.link.line-height",
                sampleBackgroundColor: "@text.Links.link.color",
                color: "#FFFFFF",
                family: "@text.Links.link.font-family",
                // ?? familyID: "fontFamily2",
                textTransform: "@text.Links.link.text-transform",
                characterStyles: [ "bold" ],
                subStyles: {
                    button: {
                        lineHeight: "@text.Links.link.line-height",
                        sampleBackgroundColor: "@text.Links.link.color",
                        color: "#FFFFFF",
                        family: "@text.Links.link.font-family",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "uppercase",
                        characterStyles: [ "bold" ],
                        size: "@text.Links.link.font-size"
                    },
                    active: {
                        lineHeight: "@text.Links.link.line-height",
                        sampleBackgroundColor: "@text.Links.link.color",
                        color: "#FFFFFF",
                        family: "@text.Links.link.font-family",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "uppercase",
                        characterStyles: [ "bold" ],
                        size: "@text.Links.link.font-size"
                    },
                    hover: {
                        lineHeight: "@text.Links.link.line-height",
                        sampleBackgroundColor: "@text.Links.link.color",
                        color: "#FFFFFF",
                        family: "@text.Links.link.font-family",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "uppercase",
                        characterStyles: [ "bold" ],
                        size: "@text.Links.link.font-size"
                    }
                },
                size: "@text.Links.link.font-size"
            },
            // review titles
            pageHeader: {
                lineHeight: "@text.ReviewTitles.line-height",
                sampleBackgroundColor: "@text.ReviewTitles.background-color",
                color: "@text.ReviewTitles.color",
                family: "@text.ReviewTitles.font-family",
                // ?? familyID: "sniffedFontFamily1637882686",
                textTransform: "@text.ReviewTitles.text-transform",
                characterStyles: [ "@text.ReviewTitles.font-style", "@text.ReviewTitles.font-weight" ],
                size: "@text.ReviewTitles.font-size"
            },
            ugcDate: {
                lineHeight: '@text.ReviewDates.line-height',
                sampleBackgroundColor: "@text.ReviewDates.background-color",
                color: "@text.ReviewDates.color",
                family: "@text.ReviewDates.font-family",
                // ?? familyID: "sniffedFontFamily1637882686",
                textTransform: "@text.ReviewDates.text-transform",
                characterStyles: [ "@text.ReviewDates.font-style", "@text.ReviewDates.font-weight" ],
                size: 11
            },
            sectionHeader: {
                lineHeight: "@text.SectionHeaderTitle.line-height",
                sampleBackgroundColor: "@text.SectionHeaderTitle.background-color",
                color: "@text.SectionHeaderTitle.color",
                family: "@text.SectionHeaderTitle.font-family",
                // ?? familyID: "sniffedFontFamily1637882686",
                textTransform: "@text.SectionHeaderTitle.text-transform",
                characterStyles: [ "@text.SectionHeaderTitle.link.font-style", "@text.SectionHeaderTitle.link.font-weight" ],
                size: "@text.SectionHeaderTitle.font-size"
            },
            link: {
                lineHeight: "@text.Links.link.line-height",
                family: "@text.Links.link.font-family",
                // ?? familyID: "fontFamily2",
                textTransform: "@text.Links.link.text-transform",
                characterStyles: [ "@text.Links.link.font-style", "@text.Links.link.font-weight" ],
                subStyles: {
                    visited: {
                        lineHeight: "@text.Links.visited.line-height",
                        sampleBackgroundColor: "@text.Links.visited.background-color",
                        color: "@text.Links.visited.color",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "@text.Links.visited.text-transform",
                        characterStyles: [ "@text.Links.visited.font-style", "@text.Links.visited.font-weight" ],
                        size: "@text.Links.visited.font-size"
                    },
                    link: {
                        lineHeight: "@text.Links.link.line-height",
                        sampleBackgroundColor: "@text.Links.link.background-color",
                        color: "@text.Links.link.color",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "@text.Links.link.text-transform",
                        characterStyles: [ "@text.Links.link.font-style", "@text.Links.link.font-weight" ],
                        size: "@text.Links.link.font-size"
                    },
                    active: {
                        lineHeight: "@text.Links.active.line-height",
                        sampleBackgroundColor: "@text.Links.active.background-color",
                        color: "@text.Links.active.color",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "@text.Links.active.text-transform",
                        characterStyles: [ "@text.Links.active.font-style", "@text.Links.active.font-weight" ],
                        size: "@text.Links.active.font-size"
                    },
                    hover: {
                        lineHeight: "@text.Links.hover.line-height",
                        sampleBackgroundColor: "@text.Links.hover.background-color",
                        color: "@text.Links.hover.color",
                        family: "Arial, sans-serif",
                        // ?? familyID: "sniffedFontFamily1637882686",
                        textTransform: "@text.Links.hover.text-transform",
                        characterStyles: [ "@text.Links.hover.font-style", "@text.Links.hover.font-weight" ],
                        size: "@text.Links.hover.font-size"
                    }
                },
                size: "@text.Links.link.font-size"
            },
            labels: {
                lineHeight: "@text.Lables.line-height",
                sampleBackgroundColor: "@text.Lables.background-color",
                color: "@text.Lables.color",
                family: "@text.Lables.font-family",
                textTransform: "@text.Lables.text-transform",
                characterStyles: [ "@text.Lables.font-style", "@text.Lables.font-weight" ],
                size: "@text.Lables.font-size"
            },
            dimensionValues: {
                lineHeight: "@text.DimensionValues.line-height",
                sampleBackgroundColor: "@text.DimensionValues.background-color",
                color: "@text.DimensionValues.color",
                family: "@text.DimensionValues.font-family",
                textTransform: "@text.DimensionValues.text-transform",
                characterStyles: [ "@text.DimensionValues.font-style", "@text.DimensionValues.font-weight" ],
                size: "@text.DimensionValues.font-size"
            },
            sectionHeaderControls: {
                lineHeight: "@text.SectionHeaderControls.line-height",
                sampleBackgroundColor: "@text.SectionHeaderControls.background-color",
                color: "@text.SectionHeaderControls.color",
                family: "@text.SectionHeaderControls.font-family",
                textTransform: "@text.SectionHeaderControls.text-transform",
                characterStyles: [ "@text.SectionHeaderControls.font-style", "@text.SectionHeaderControls.font-weight" ],
                size: "@text.SectionHeaderControls.font-size"
            },
            ugcName: {
                lineHeight: "@text.ReviewerName.line-height",
                sampleBackgroundColor: "@text.ReviewerName.background-color",
                color: "@text.ReviewerName.color",
                family: "@text.ReviewerName.font-family",
                textTransform: "@text.ReviewerName.text-transform",
                characterStyles: [ "@text.ReviewerName.font-style", "@text.ReviewerName.font-weight" ],
                size: "@text.ReviewerName.font-size"
            }
        },
        borders: {
            "button-primary": {
                bottomRightRadius: 3,
                bottomLeftRadius: 3,
                topRightRadius: 3,
                bottom: {
                    style: "@borders.PrimaryButton.border-bottom-style|none",
                    color: "@borders.PrimaryButton.border-bottom-color|transparent",
                    width: "@borders.PrimaryButton.border-bottom-width|0"
                },
                left: {
                    style: "@borders.PrimaryButton.border-left-style|none",
                    color: "@borders.PrimaryButton.border-left-color|transparent",
                    width: "@borders.PrimaryButton.border-left-width|0"
                },
                right: {
                    style: "@borders.PrimaryButton.border-right-style|none",
                    color: "@borders.PrimaryButton.border-right-color|transparent",
                    width: "@borders.PrimaryButton.border-right-width|0"
                },
                topLeftRadius: 3,
                radiiLocked: true,
                top: {
                    style: "@borders.PrimaryButton.border-top-style|none",
                    color: "@borders.PrimaryButton.border-top-color|transparent",
                    width: "@borders.PrimaryButton.border-top-width|0"
                }
            },
            "prs-container": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "@borders.RatingSummary.border-bottom-style|none",
                    color: "@borders.RatingSummary.border-bottom-color|transparent",
                    width: "@borders.RatingSummary.border-bottom-width|0"
                },
                left: {
                    style: "@borders.RatingSummary.border-left-style|none",
                    color: "@borders.RatingSummary.border-left-color|transparent",
                    width: "@borders.RatingSummary.border-left-width|0"
                },
                right: {
                    style: "@borders.RatingSummary.border-right-style|none",
                    color: "@borders.RatingSummary.border-right-color|transparent",
                    width: "@borders.RatingSummary.border-right-width|0"
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "@borders.RatingSummary.border-top-style|none",
                    color: "@borders.RatingSummary.border-top-color|transparent",
                    width: "@borders.RatingSummary.border-top-width|0"
                }
            },
            "button-secondary": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "@borders.SecondaryButton.border-bottom-style|none",
                    color: "@borders.SecondaryButton.border-bottom-color|transparent",
                    width: "@borders.SecondaryButton.border-bottom-width|0"
                },
                left: {
                    style: "@borders.SecondaryButton.border-left-style|none",
                    color: "@borders.SecondaryButton.border-left-color|transparent",
                    width: "@borders.SecondaryButton.border-left-width|0"
                },
                right: {
                    style: "@borders.SecondaryButton.border-right-style|none",
                    color: "@borders.SecondaryButton.border-right-color|transparent",
                    width: "@borders.SecondaryButton.border-right-width|0"
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "@borders.SecondaryButton.border-top-style|none",
                    color: "@borders.SecondaryButton.border-top-color|transparent",
                    width: "@borders.SecondaryButton.border-top-width|0"
                }
            },
            "content-summary": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "@borders.ContentSummary.border-bottom-style|none",
                    color: "@borders.ContentSummary.border-bottom-color|transparent",
                    width: "@borders.ContentSummary.border-bottom-width|0"
                },
                left: {
                    style: "@borders.ContentSummary.border-left-style|none",
                    color: "@borders.ContentSummary.border-left-color|transparent",
                    width: "@borders.ContentSummary.border-left-width|0"
                },
                right: {
                    style: "@borders.ContentSummary.border-right-style|none",
                    color: "@borders.ContentSummary.border-right-color|transparent",
                    width: "@borders.ContentSummary.border-right-width|0"
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "@borders.ContentSummary.border-top-style|none",
                    color: "@borders.ContentSummary.border-top-color|transparent",
                    width: "@borders.ContentSummary.border-top-width|0"
                }
            },
            "content-item": {
                bottomRightRadius: 0,
                bottomLeftRadius: 0,
                topRightRadius: 0,
                bottom: {
                    style: "@borders.ContentItem.border-bottom-style|none",
                    color: "@borders.ContentItem.border-bottom-color|transparent",
                    width: "@borders.ContentItem.border-bottom-width|0"
                },
                left: {
                    style: "@borders.ContentItem.border-left-style|none",
                    color: "@borders.ContentItem.border-left-color|transparent",
                    width: "@borders.ContentItem.border-left-width|0"
                },
                right: {
                    style: "@borders.ContentItem.border-right-style|none",
                    color: "@borders.ContentItem.border-right-color|transparent",
                    width: "@borders.ContentItem.border-right-width|0"
                },
                topLeftRadius: 0,
                radiiLocked: false,
                top: {
                    style: "@borders.ContentItem.border-top-style|none",
                    color: "@borders.ContentItem.border-top-color|transparent",
                    width: "@borders.ContentItem.border-top-width|0"
                }
            }
        }
    }
}