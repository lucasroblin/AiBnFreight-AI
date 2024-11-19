import { Offer } from '@/lib/api-client'

interface NotesProps {
    offer: Offer
}

export function OffersNotes({ offer }: NotesProps) {
    return (
        <div>
            <p className='font-bold text-sm'>Notes :</p>
            <p>{offer.notes}</p>
        </div>
    )
}