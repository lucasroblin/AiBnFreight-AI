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
                            <MenubarItem onClick={showModal}>New offer</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>My offer</MenubarItem>
                            <MenubarSeparator />
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </>
    )
}