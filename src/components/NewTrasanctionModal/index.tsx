import * as zod from "zod";
import * as Radix from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});

type NewTransactionFormInputProps = zod.infer<typeof newTransactionSchema>;

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<NewTransactionFormInputProps>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type: "income",
    },
  });

  function handleCreateNewTransaction(data: NewTransactionFormInputProps) {
    const { category, description, price, type } = data;

    createTransaction({ category, description, price, type });

    reset();
  }

  return (
    <Dialog.Portal>
      <Radix.Overlay />

      <Radix.Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <Radix.CloseButton>
          <X size={24} />
        </Radix.CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <Radix.TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <Radix.TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </Radix.TransactionTypeButton>
                  <Radix.TransactionTypeButton
                    variant="outcome"
                    value="outcome"
                  >
                    <ArrowCircleDown size={24} />
                    Saída
                  </Radix.TransactionTypeButton>
                </Radix.TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Radix.Content>
    </Dialog.Portal>
  );
}
