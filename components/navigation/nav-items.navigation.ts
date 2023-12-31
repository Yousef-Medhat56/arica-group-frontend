interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    locale?: string;
    iconName?: string;
    description?: string;
}

const NAV_ITEMS = (content: any, services?: any): Array<NavItem> => {
    return [
        {
            label: content.header.services,
            href: "#",
            children: [
                {
                    label: content.services.designGardens.name,
                    subLabel: content.services.designGardens.shortDesc,
                    description: services && services.gardens,
                    href: "/gardens",
                    iconName: "design-gardens.svg",
                },
                {
                    label: content.services.maintenanceWork.name,
                    subLabel: content.services.maintenanceWork.shortDesc,
                    description: services && services.maintainance,
                    iconName: "maintenance-work.svg",
                    href: "/maintenance-request",
                },
                {
                    label: content.services.swimmingPools.name,
                    subLabel: content.services.swimmingPools.shortDesc,
                    description: services && services.swimming_pools,
                    iconName: "swimming-pools.svg",
                    href: "/swimming-pools",
                },
                {
                    label: content.services.foundations.name,
                    subLabel: content.services.foundations.shortDesc,
                    description: services && services.fountains,
                    iconName: "fountain.svg",
                    href: "/fountains",
                },
                {
                    label: content.services.irrigationNetworks.name,
                    subLabel: content.services.irrigationNetworks.shortDesc,
                    description:
                        services && services.irrigation_networks,
                    iconName: "irrigation-network.svg",
                    href: "/irrigation-networks",
                },
                {
                    label: content.services.electricyNetwork.name,
                    subLabel: content.services.electricyNetwork.shortDesc,
                    description:
                        services && services.electricity_networks,
                    iconName: "electricity-network.svg",
                    href: "/electricity-networks",
                },
                {
                    label: content.services.gardenAcc.name,
                    subLabel: content.services.gardenAcc.shortDesc,
                    description: services && services.accessories,
                    iconName: "garden-acc.svg",
                    href: "/accessories",
                },
                {
                    label: content.services.studentTraining.name,
                    subLabel: content.services.studentTraining.shortDesc,
                    description:
                        services && services.student_training,
                    iconName: "student-training.svg",
                    href: "/student-training",
                },
            ],
        },
        {
            label: content.header.offers,
            href: "/offers",
        },
        {
            label: content.header.contact,
            href: "/contact",
        },
        {
            label: content.header.about,
            href: "/about-us",
            children: [
                { label: content.about.overview, href: "/about-us#overview" },
                { label: content.about.history, href: "/about-us#history" },
                { label: content.about.vision, href: "/about-us#vision" },
                { label: content.about.team, href: "/about-us#team" },
            ],
        },
        // {
        //     label: content.header.about,
        //     href: "/about-us",
        // },
        // {
        //     label: content.header.search,
        //     href: "/search",
        // },
    ];
};

export default NAV_ITEMS;
export type { NavItem };
