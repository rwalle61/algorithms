# Assumptions:
# length >= 0
# non-decreasing
# nums can be negative

# Best Computational Runtime:
# runtime (n): need to square each element. probably smart solution doesn't have to move too much
# space (1)

# Solutions:

# brute
# runtime (n log n): square (n) then sort (n log n)
# space: (1) can use unstable n log n sort (heapsort)

# 2 pointers
# runtime (n): pointers at closest to 0, square on each step outwards
# space (1)

# 2 pointers simpler
# runtime (n): pointers at ends, square on each step inwards
# space (1)


def square_array_brute(input_array: list[int]) -> list[int]:
    output_array = []

    for num in input_array:
        output_array.append(num**2)

    output_array.sort()

    return output_array


def test_square_array_brute() -> None:
    assert square_array_brute([]) == []
    assert square_array_brute([1]) == [1]
    assert square_array_brute([-4, -1, 0, 3, 10]) == [0, 1, 9, 16, 100]
    assert square_array_brute([-7, -3, 2, 3, 11]) == [4, 9, 9, 49, 121]


def square_array_2_pointers_inside_out(input_array: list[int]) -> list[int]:
    output_array = []

    if len(input_array) == 0:
        return output_array

    left = 0

    current_min_square = input_array[left] ** 2

    while (
        left + 1 < len(input_array)
        and (input_array[left + 1] ** 2) < current_min_square
    ):
        current_min_square = input_array[left] ** 2
        left += 1

    current_min_square = input_array[left] ** 2
    output_array.append(current_min_square)

    right = left + 1
    left -= 1

    # what complexity is this? change the check?
    while len(output_array) < len(input_array):
        if left == -1:
            # what if right out of bound?
            current_min_square = input_array[right] ** 2
            output_array.append(current_min_square)
            right += 1
        elif right == len(input_array):
            current_min_square = input_array[left] ** 2
            output_array.append(current_min_square)
            left -= 1
        elif input_array[left] ** 2 < input_array[right] ** 2:
            current_min_square = input_array[left] ** 2
            output_array.append(current_min_square)
            left -= 1
        else:
            current_min_square = input_array[right] ** 2
            output_array.append(current_min_square)
            right += 1

    return output_array


def test_square_array_2_pointers_inside_out() -> None:
    assert square_array_2_pointers_inside_out([]) == []

    assert square_array_2_pointers_inside_out([1]) == [1]

    assert square_array_2_pointers_inside_out([0, 1]) == [0, 1]
    assert square_array_2_pointers_inside_out([-2, 1]) == [1, 4]
    assert square_array_2_pointers_inside_out([-1, 2]) == [1, 4]

    assert square_array_2_pointers_inside_out([-2, -1, 0, 1, 2]) == [0, 1, 1, 4, 4]
    assert square_array_2_pointers_inside_out([-4, -1, 0, 3, 10]) == [0, 1, 9, 16, 100]
    assert square_array_2_pointers_inside_out([-7, -3, 2, 3, 11]) == [4, 9, 9, 49, 121]


def square_array_2_pointers_outside_in(input_array: list[int]) -> list[int]:
    # Or:
    # import array
    # output_array = array.array("i", [0] * len(input_array))
    not_processed_yet_int = 0
    output_array = [not_processed_yet_int] * len(input_array)

    left = 0
    right = len(input_array) - 1
    insertion_pointer = right

    while left <= right:
        left_square = input_array[left] ** 2
        right_square = input_array[right] ** 2

        if left_square > right_square:
            output_array[insertion_pointer] = left_square
            left += 1
        else:
            output_array[insertion_pointer] = right_square
            right -= 1
        insertion_pointer -= 1

    return output_array


def test_square_array_2_pointers_outside_in() -> None:
    assert square_array_2_pointers_outside_in([]) == []

    assert square_array_2_pointers_outside_in([1]) == [1]

    assert square_array_2_pointers_outside_in([0, 1]) == [0, 1]
    assert square_array_2_pointers_outside_in([-2, 1]) == [1, 4]
    assert square_array_2_pointers_outside_in([-1, 2]) == [1, 4]

    assert square_array_2_pointers_outside_in([-2, -1, 0, 1, 2]) == [0, 1, 1, 4, 4]
    assert square_array_2_pointers_outside_in([-4, -1, 0, 3, 10]) == [0, 1, 9, 16, 100]
    assert square_array_2_pointers_outside_in([-7, -3, 2, 3, 11]) == [4, 9, 9, 49, 121]
