import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import * as Radix from './styles'

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Radix.Overlay />

      <Radix.Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <Radix.CloseButton>
          <X size={24} />
        </Radix.CloseButton>

        <form>
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

          <Radix.TransactionType>
            <Radix.TransactionTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </Radix.TransactionTypeButton>
            <Radix.TransactionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </Radix.TransactionTypeButton>
          </Radix.TransactionType>

          <button type="submit">Cadastrar</button>
        </form>
      </Radix.Content>
    </Dialog.Portal>
  )
}
