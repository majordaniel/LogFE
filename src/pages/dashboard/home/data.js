// TASKS ARRAY

export const unassignedTask = [
    {
        id: 1,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "unassigned",
        delayed: true
    },
    {
        id: 2,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "unassigned",
        delayed: true,
    },
    {
        id: 3,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "unassigned",
        delayed: true,
    },
    {
        id: 4,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "unassigned",
        delayed: true,
    },
    {
        id: 5,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "unassigned",
        delayed: true,
    },
];

export const assignedTask = [
    {
        id: 1,
        time: "07:00",
        clientName: "Jonh Doe",
        address: "Alwrood3",
        status: "inprogress",
        delayed: true,
        assignedAgent: {
            name: "Agent name",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 2,
        time: "01:00 - 08:00 ",
        clientName: "Client 2",
        address: "Alwrood3",
        status: "acknowledged",
        delayed: true,
        assignedAgent: {
            name: "Agent 1",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 3,
        time: "03:00",
        clientName: "client 3",
        address: "Alwrood3",
        status: "assigned",
        delayed: false,
        assignedAgent: {
            name: "Agent 2",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 4,
        time: "07:00",
        clientName: "client 4",
        address: "Alwrood3",
        status: "inprogress",
        delayed: true,
        assignedAgent: {
            name: "Agent 3",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 5,
        time: "04:00",
        clientName: "clent 5",
        address: "Alwrood3",
        status: "started",
        delayed: true,
        assignedAgent: {
            name: "Agent 4",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    }
];


export const completedTask = [
    {
        id: 1,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "successful",
        delayed: true,
        assignedAgent: {
            name: "Agent name",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 2,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "cancelled",
        assignedAgent: {
            name: "Agent name",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 3,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "cancelled",
        delayed: true,
        assignedAgent: {
            name: "Agent name",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 4,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "successful",
        assignedAgent: {
            name: "Agent name",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
    {
        id: 5,
        time: "06:00",
        clientName: "Client 1",
        address: "Alwrood3",
        status: "successful",
        delayed: true,
        assignedAgent: {
            name: "Agent name",
            image:
                "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg"
        }
    },
];


// DELEGATES ARRAY


export const freeAgents = [
    {
        id: 1,
        name: "John Doe",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+234000000000",
        team: "team 1",
        totalTask: 32,
        taskRemaining: 32,
        status: "free"
    },
    {
        id: 2,
        name: "John Doe",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2341283746536",
        team: "team 7",
        totalTask: 0,
        taskRemaining: 0,
        status: "free"
    },
    {
        id: 3,
        name: "John Doe",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2347498562743",
        team: "team 5",
        totalTask: 5,
        taskRemaining: 5,
        status: "free"
    },
    {
        id: 5,
        name: "John Doe",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+234893642845",
        team: "team 1",
        totalTask: 29,
        taskRemaining: 29,
        status: "free"
    },
    {
        id: 6,
        name: "John Doe",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+234748495762",
        team: "team 8",
        totalTask: 2,
        taskRemaining: 2,
        status: "free"
    },
    {
        id: 7,
        name: "John Doe",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+23498753753",
        team: "team",
        totalTask: 15,
        taskRemaining: 15,
        status: "free"
    },

]

export const busyAgents = [
    {
        id: 1,
        name: "Busy Agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2349037399392",
        team: "team 1",
        totalTask: 32,
        taskRemaining: 32,
        status: "busy"
    },
    {
        id: 2,
        name: "Busy Agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2349037399392",
        team: "team 1",
        totalTask: 20,
        taskRemaining: 10,
        status: "busy"
    },
    {
        id: 3,
        name: "Busy Agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2349037399392",
        team: "team 8",
        totalTask: 5,
        taskRemaining: 15,
        status: "busy"
    },
    {
        id: 5,
        name: "Busy Agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2349037399392",
        team: "team 1",
        totalTask: 12,
        taskRemaining: 2,
        status: "busy"
    },
    {
        id: 6,
        name: "Busy Agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2349037399392",
        team: "team 8",
        totalTask: 32,
        taskRemaining: 22,
        status: "busy"
    },
    {
        id: 7,
        name: "Busy Agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2349037399392",
        team: "team",
        totalTask: 1,
        taskRemaining: 5,
        status: "busy"
    },

]

export const inactiveAgents = [
    {
        id: 1,
        name: "Inactive agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+234000000000",
        team: "team 1",
        totalTask: 32,
        taskRemaining: 32,
        status: "free"
    },
    {
        id: 2,
        name: "Inactive agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2341283746536",
        team: "team 7",
        totalTask: 0,
        taskRemaining: 0,
        status: "free"
    },
    {
        id: 3,
        name: "Inactive agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+2347498562743",
        team: "team 5",
        totalTask: 5,
        taskRemaining: 5,
        status: "free"
    },
    {
        id: 4,
        name: "Inactive agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+234893642845",
        team: "team 1",
        totalTask: 29,
        taskRemaining: 29,
        status: "free"
    },
    {
        id: 5,
        name: "Inactive agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+234748495762",
        team: "team 8",
        totalTask: 2,
        taskRemaining: 2,
        status: "free"
    },
    {
        id: 6,
        name: "Inactive agents",
        image: "https://tookan.s3.amazonaws.com/fleet_thumb_profile/thumb-k0WE1543235425836-Lt5O1543235425173%D8%B9%D8%A8%D8%AF%D9%87%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86.jpeg",
        phone: "+23498753753",
        team: "team",
        totalTask: 15,
        taskRemaining: 15,
        status: "free"
    },

]
