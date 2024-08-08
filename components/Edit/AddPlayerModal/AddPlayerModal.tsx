import React, { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { Player as DBPlayer } from '@prisma/client';
import SearchByTeamOption from './SearchByTeamOption/SearchByTeamOption';
import ApiPlayer from '@/models/apiFootball/player.model';
import { PlayerOption } from './SearchByTeamOption/RenderFilterOptions';
import { RefreshCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props extends Pick<DialogProps, 'open' | 'onOpenChange'> {
  playerToReplace: DBPlayer;
  onSubmit: (player: ApiPlayer) => Promise<void>;
  submitting: boolean;
}

const AddPlayerModal: FC<Props> = ({
  onOpenChange,
  open,
  playerToReplace,

  onSubmit,
  submitting,
}) => {
  const [sP, setSelectedPlayer] = useState<ApiPlayer | null>(null);

  useEffect(() => {
    // Cleanup
    if (!open) return setSelectedPlayer(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[750px]'>
        <DialogHeader>
          {!sP ? (
            <>
              <DialogTitle>Cambiar jugador</DialogTitle>
              <DialogDescription>
                Selecciona un sustituto para {playerToReplace.name}
              </DialogDescription>{' '}
            </>
          ) : (
            <>
              <DialogTitle>Confirmar cambio</DialogTitle>
              <DialogDescription>
                Se hara el siguiente cambio
              </DialogDescription>{' '}
            </>
          )}
        </DialogHeader>
        {sP ? (
          <div className='flex flex-col items-end gap-3'>
            <div className='flex flex-col md:flex-row w-full items-center gap-6'>
              <PlayerOption
                className='flex-grow w-full'
                onlyLecture
                {...playerToReplace}
              />
              <RefreshCcw size={60} className='text-green-500 animate-spin' />
              <PlayerOption
                age={sP.player_age}
                goals={sP.player_goals}
                img={sP.player_image}
                name={sP.player_name}
                rating={sP.player_rating}
                onlyLecture
                className='w-full'
              />
            </div>
            <div className='flex'>
              {' '}
              <Button
                variant={'link'}
                disabled={submitting}
                onClick={() => setSelectedPlayer(null)}
              >
                Cancelar
              </Button>
              <Button
                disabled={submitting}
                onClick={() => onSubmit(sP)}
                variant={'default'}
              >
                <Save size={16} />
                Confirmar
              </Button>
            </div>
          </div>
        ) : (
          <SearchByTeamOption onPlayerSelect={setSelectedPlayer} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayerModal;
