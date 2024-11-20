import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"

interface modalType {
    showModal: () => void
}


export function MenuBar({ showModal }: modalType) {
    return (
        <>
            <div className="flex">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Booking</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>New booking</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>My booking</MenubarItem>
                            <MenubarSeparator />
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>Offers</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={showModal}>New Offer</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>My Offer</MenubarItem>
                            <MenubarSeparator />
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </>
    )
}