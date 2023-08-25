import {Option} from  '../form-components/FormInputDropdown';

const assigneeOne : Option = {
    label: 'Committee Member',
    value: 'Committee Member',
} 
const assigneeTwo : Option = {
    label: 'Specific Committee',
    value: 'Specific Committee',
} 
const assigneeThree : Option = {
    label: 'All of SAA',
    value: 'All of SAA',
} 

const alumniRelationsPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "Entertainment Networking Night Directors",
        value: "Entertainment Networking Night Directors"
    },
    {
        label: "Alumni Networking Series Directors",
        value: "Alumni Networking Series Directors"
    },
    {
        label: "Alumni Engagement Directors",
        value: "Alumni Engagement Directors",
    }
]
const brucoPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "D12 Directors",
        value: "D12 Directors"
    },
    {
        label: "Campus Engagement Directors",
        value: "Campus Engagement Directors"
    },
    {
        label: "Community Development Directors",
        value: "Community Development Directors",
    }
]
const bruinSpiritPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "I <3 UCLA Directors",
        value: "I <3 UCLA Directors"
    },
    {
        label: "Senior Programming Directors",
        value: "Senior Programming Directors "
    },
    {
        label: "Beat 'SC Directors",
        value: "Beat 'SC Directors",
    }
]
const externalPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "Campus Relations Directors",
        value: "Campus Relations Directors"
    },
    {
        label: "Project Management Consultants",
        value: "Project Management Consultants"
    },
    {
        label: "Service Learning Directors",
        value: "Service Learning Directors",
    }
]

const internalPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "Morale Directors",
        value: "Morale Directors"
    },
    {
        label: "Event Production Directors",
        value: "Event Production Directors"
    },
    {
        label: "Member Experience Directors",
        value: "Member Experience Directors",
    }
]
const leadershipDevPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "Leadership Program Coordinators",
        value: "Leadership Program Coordinators"
    },
    {
        label: "Member Education Coordinators",
        value: "Member Education Coordinators"
    },
    {
        label: "Professional Growth Managers",
        value: "Professional Growth Managers",
    }
]
const mediaMarketingPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "Creative Media Designers",
        value: "Creative Media Designers"
    },
    {
        label: "Marketing Consultants",
        value: "Marketing Consultants"
    },
    {
        label: "Integrated Marketing and Communications Coordinators",
        value: "Integrated Marketing and Communications Coordinators",
    }
]
const proDevoPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "Interview With A Bruin Directors",
        value: "Interview With A Bruin Directors"
    },
    {
        label: "Specialized Programming Series Directors",
        value: "Specialized Programming Series Directors"
    },
    {
        label: "Mentorship Directors",
        value: "Mentorship Directors"
    }
]
const springSingPositions : Option[] = [
    {
        label: "Executive Director",
        value: "Executive Director"
    },
    {
        label: "Assistant Director",
        value: "Assistant Director"
    },
    {
        label: "Comedy Producers",
        value: "Comedy Producers"
    },
    {
        label: "Media Directors",
        value: "Media Directors"
    },
    {
        label: "Celebrity Coordinators",
        value: "Celebrity Coordinators"
    },
    {
        label: "Production Coordinators",
        value: "Production Coordinators"
    },
    {
        label: "Business Development Directors",
        value: "Business Development Directors"
    }
]


const alumniRelations : Option = {
    label: 'Alumni Relations',
    value: 'Alumni Relations',
}
const bruinCommunity : Option = {
    label: 'Bruin Community',
    value: 'Bruin Community',
}
const bruinSpirit : Option = {
    label: 'Bruin Spirit',
    value: 'Bruin Spirit',
}
const externalRelations : Option = {
    label: 'External Relations',
    value: 'External Relations',
}
const internalRelations : Option = {
    label: 'Internal Relations',
    value: 'Internal Relations',
}
const leadershipDevelopment : Option = {
    label: 'Leadership Development',
    value: 'Leadership Development',
}
const mediaMarketing : Option = {
    label: 'Media Marketing',
    value: 'Media Marketing',
}
const professionalDevelopment : Option = {
    label: 'Professional Development',
    value: 'Professional Development',
}
const springSing : Option = {
    label: 'Spring Sing',
    value: 'Spring Sing',
}

export const assigneeOptions = [assigneeOne, assigneeTwo, assigneeThree];

export const committeeOptions = [alumniRelations, bruinCommunity, bruinSpirit, externalRelations, internalRelations, leadershipDevelopment, mediaMarketing, professionalDevelopment, springSing]

export const getCommitteePositions = (committee: string) => {
    switch (committee) {
        case "Alumni Relations":
            return alumniRelationsPositions
        case "Bruin Spirit":
            return bruinSpiritPositions
        case "Bruin Community":
            return brucoPositions
        case "External Relations":
            return externalPositions
        case "Leadership Development":     
            return leadershipDevPositions
        case "Internal Relations":
            return internalPositions
        case "Professional Development":  
            return proDevoPositions
        case "Media Marketing":
            return mediaMarketingPositions
        case "Spring Sing":
            return springSingPositions
        default:
            return committeeOptions;
    }
}

export const getAssigneeOptions = (committee: string) => {
    switch (committee) {
        case "Alumni Relations":
            return alumniRelationsPositions.concat(committeeOptions)
        case "Bruin Spirit":
            return bruinSpiritPositions.concat(committeeOptions)
        case "Bruin Community":
            return brucoPositions.concat(committeeOptions)
        case "External Relations":
            return externalPositions.concat(committeeOptions)
        case "Leadership Development":     
            return leadershipDevPositions.concat(committeeOptions)
        case "Internal Relations":
            return internalPositions.concat(committeeOptions)
        case "Professional Development":  
            return proDevoPositions.concat(committeeOptions)
        case "Media Marketing":
            return mediaMarketingPositions.concat(committeeOptions)
        case "Spring Sing":
            return springSingPositions.concat(committeeOptions)
        default:
            return committeeOptions;
    }
}

export const getCategoryOptions = () => {
    const options : Option[] = [{ 
        label: "Social",
        value: "Social"
    },
    { 
        label: "Committee",
        value: "Committee"
    },
    { 
        label: "SAA",
        value: "SAA"
    },]
    
    return options
}

export enum TaskCategory {
    SOCIAL = 'Social',
    ALL_SAA = 'SAA',
    COMMITTEE = 'Committee'

}