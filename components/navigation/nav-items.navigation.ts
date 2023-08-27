interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    locale?: string;
    iconName?: string;
    description?: string;
}

const NAV_ITEMS = (content: any): Array<NavItem> => {
    return [
        {
            label: content.header.services,
            href: "#",
            children: [
                {
                    label: content.services.designGardens.name,
                    subLabel: content.services.designGardens.shortDesc,
                    description: content.services.designGardens.longDesc,
                    href: "/gardens",
                    iconName: "design-gardens.svg",
                },
                {
                    label: content.services.maintenanceWork.name,
                    subLabel: content.services.maintenanceWork.shortDesc,
                    description: content.services.maintenanceWork.longDesc,
                    iconName: "maintenance-work.svg",
                    href: "/maintenance-request",
                },
                {
                    label: content.services.swimmingPools.name,
                    subLabel: content.services.swimmingPools.shortDesc,
                    description: content.services.swimmingPools.longDesc,
                    iconName: "swimming-pools.svg",
                    href: "/swimming-pools",
                },
                {
                    label: content.services.foundations.name,
                    subLabel: content.services.foundations.shortDesc,
                    description: content.services.foundations.longDesc,
                    iconName: "fountain.svg",
                    href: "/fountains",
                },
                {
                    label: content.services.irrigationNetworks.name,
                    subLabel: content.services.irrigationNetworks.shortDesc,
                    description: content.services.irrigationNetworks.longDesc,
                    iconName: "irrigation-network.svg",
                    href: "/irrigation-networks",
                },
                {
                    label: content.services.electricyNetwork.name,
                    subLabel: content.services.electricyNetwork.shortDesc,
                    description: content.services.electricyNetwork.longDesc,
                    iconName: "electricity-network.svg",
                    href: "/electricity-networks",
                },
                {
                    label: content.services.gardenAcc.name,
                    subLabel: content.services.gardenAcc.shortDesc,
                    description: content.services.gardenAcc.longDesc,
                    iconName: "garden-acc.svg",
                    href: "/accessories",
                },
                {
                    label: content.services.studentTraining.name,
                    subLabel: content.services.studentTraining.shortDesc,
                    description: content.services.studentTraining.longDesc,
                    iconName: "student-training.svg",
                    href: "/student-training",
                },
            ],
        },
        {
            label: content.header.offers,
            href: "/offers",
        },
        // {
        //     label: content.header.about,
        //     href: "/about",
        // },
        // {
        //     label: content.header.search,
        //     href: "/search",
        // },
    ];
};

export default NAV_ITEMS;
export type { NavItem };
